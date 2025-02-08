const { ipcRenderer, clipboard, shell } = require('electron');
const { format } = require('date-fns');

window.addEventListener('DOMContentLoaded', () => {
  const closeWindow = document.getElementById('close-window');
  const minimizeWindow = document.getElementById('minimize-window');
  let defaultSourcePath, defaultTargetPath;
  closeWindow?.addEventListener('click', () => {
    ipcRenderer.invoke('close-app');
  });
  minimizeWindow?.addEventListener('click', () => {
    ipcRenderer.invoke('minimize-app');
  });

  const sourcePathPreview = document.getElementById('source-path-preview');
  const targetPathPreview = document.getElementById('target-path-preview');

  ipcRenderer.on('initialData', function (evt, message) {
    defaultSourcePath = message.defaultSourcePath;
    defaultTargetPath = message.defaultTargetPath;
    const customSource = getLocalStorageItem('custom-source-folder-path');
    const customTarget = getLocalStorageItem('custom-target-folder-path');
    sourcePathPreview.value = customSource || defaultSourcePath;
    targetPathPreview.value = customTarget || defaultTargetPath;
  });

  const resetsButtons = document.querySelectorAll('#reset-source, #reset-target');
  [...resetsButtons].forEach(function (item) {
    item.addEventListener('click', async (e) => {
      const item = e.target.id === 'reset-source' ? 'custom-source-folder-path' : 'custom-target-folder-path';
      const data = e.target.id === 'reset-source' ? defaultSourcePath : defaultTargetPath;
      const previewEl = e.target.id === 'reset-source' ? sourcePathPreview : targetPathPreview;
      const checkboxEl = document.getElementById(e.target.id === 'reset-source'
        ? 'custom-source-path'
        : 'custom-target-path');
      const folderPathElement = e.target.id === 'reset-source' ? customSourceFolderPath : customTargetFolderPath;
      setLocalStorageItem(item, data);
      previewEl.value = data;
      checkboxEl.checked = false;
      folderPathElement.style.display = e.target.checked ? 'block' : 'none';
    });
  });

  const customFolderPaths = document.querySelectorAll('#custom-source-folder-path, #custom-target-folder-path');
  [...customFolderPaths].forEach(function (item) {
    item.addEventListener('click', async (e) => {
      const path = await ipcRenderer.invoke('open-folder', e.target.id === 'custom-source-folder-path'
        ? 'source'
        : 'target');
      const previewEl = e.target.id === 'custom-source-folder-path' ? sourcePathPreview : targetPathPreview;
      previewEl.value = path;
      setLocalStorageItem(e.target.id, path);
    });
  });

  const customSourceFolderPath = document.getElementById('custom-source-folder-path');
  const customTargetFolderPath = document.getElementById('custom-target-folder-path');
  const customCheckboxPaths = document.querySelectorAll('#custom-source-path, #custom-target-path');

  [...customCheckboxPaths].forEach((item) => {
    item.addEventListener('change', function (e) {
      const folderPathElement = e.target.id === 'custom-source-path' ? customSourceFolderPath : customTargetFolderPath;
      folderPathElement.style.display = e.target.checked ? 'block' : 'none';
    });
  });

  const runButton = document.getElementById('run-button');
  const result = document.getElementById('result');
  const checkIcon = document.getElementById('check-icon');
  const currentUpdateTime = document.getElementById('current-update-time');

  runButton?.addEventListener('click', async () => {
    const { response } = await ipcRenderer.invoke('show-dialog', {
      type: 'warning',
      message: `Target folder (${targetPathPreview.value}) content will be overwritten, are you sure you want to proceed?`,
      buttons: ['Yes', 'No'],
      title: 'Idleon Steam Data Extractor'
    });
    if (response === 0) {
      const filePath = await ipcRenderer.invoke('run-process');
      const response = await fetch(`file://${filePath}`);
      const string = await response.json();
      const hexHash = await digestMessage(JSON.stringify(string));
      const lastHash = getLocalStorageItem('hash');
      const lastUpdate = getLocalStorageItem('lastUpdate');
      if (string) {
        result.style.display = 'inline-block';
        checkIcon.style.display = 'inline-block'
        currentUpdateTime.innerHTML = hexHash !== lastHash
          ? 'Updated'
          : `Old Data - Last Update Date: ${formatDate(lastUpdate)}`;
        debugger
        if (hexHash !== lastHash) {
          setLocalStorageItem('hash', hexHash);
          setLocalStorageItem('lastUpdate', new Date().getTime());
        }
        setTimeout(() => {
          checkIcon.style.display = 'none';
        }, 3000)
      }
    }
  });

  const copy = document.getElementById('copy-to-clipboard');
  copy.addEventListener('click', async () => {
    const response = await fetch(`file://${targetPathPreview.value}/user-data.json`);
    const string = await response.json();
    clipboard.writeText(JSON.stringify(string));
  })

  const idleonToolbox = document.getElementById('idleon-toolbox');
  idleonToolbox?.addEventListener('click', (e) => {
    e.preventDefault();
    shell.openExternal('https://idleontoolbox.com')
  })

  const idleonToolboxRepository = document.getElementById('idleon-toolbox-repository');
  idleonToolboxRepository?.addEventListener('click', (e) => {
    e.preventDefault();
    shell.openExternal('https://github.com/Morta1/idleon-steam-data-extractor')
  })
})

const digestMessage = async (message) => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message));
  return Array.from(new Uint8Array(hashBuffer), (b) => b.toString(16).padStart(2, '0')).join('');
}

const formatDate = (ms) => {
  return format(new Date(ms), 'dd/MM/yyyy HH:mm:ss');
}

const getLocalStorageItem = (item) => {
  try {
    return JSON.parse(localStorage.getItem(item));
  } catch (err) {
    return null;
  }
}

const setLocalStorageItem = (item, data) => {
  try {
    return localStorage.setItem(item, JSON.stringify(data));
  } catch (err) {
    return null;
  }
}