const { ipcRenderer, clipboard, shell } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const closeWindow = document.getElementById('close-window');
  let defaultSourcePath, defaultTargetPath;
  closeWindow?.addEventListener('click', () => {
    ipcRenderer.invoke('close-app');
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
      const checkboxEl = document.getElementById(e.target.id === 'reset-source' ? 'custom-source-path' : 'custom-target-path');
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
      const path = await ipcRenderer.invoke('open-folder', e.target.id === 'custom-source-folder-path' ? 'source' : 'target');
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
      const folderPathElement = e.target.id === "custom-source-path" ? customSourceFolderPath : customTargetFolderPath;
      folderPathElement.style.display = e.target.checked ? 'block' : 'none';
    });
  });

  const runButton = document.getElementById('run-button');
  const result = document.getElementById('result');
  const json = document.getElementById('json');
  const checkIcon = document.getElementById('check-icon');

  runButton?.addEventListener('click', async () => {
    const string = await ipcRenderer.invoke('run-process');
    if (string) {
      json.innerHTML = JSON.stringify(string);
      result.style.display = 'inline-block';
      checkIcon.style.display = 'inline-block'
      setTimeout(() => {
        checkIcon.style.display = 'none';
      }, 3000)
    }
  });

  const copy = document.getElementById('copy-to-clipboard');
  copy.addEventListener('click', () => {
    clipboard.writeText(json.value);
  })

  const idleonToolbox = document.getElementById('idleon-toolbox');
  idleonToolbox?.addEventListener('click', (e) => {
    e.preventDefault();
    shell.openExternal("https://morta1.github.io/IdleonToolbox/family")
  })
})

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