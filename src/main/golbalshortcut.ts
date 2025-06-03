import { globalShortcut } from 'electron'

function init_global_shortcuts() {
  // Register a 'Ctrl+Shift+I' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Shift+I', () => {
    console.log('CommandOrControl+Shift+I is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+Shift+I'))
}

export { init_global_shortcuts }
