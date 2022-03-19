module.exports = {
  pluginOptions: {
      electronBuilder: {
          nodeIntegration: true,
          builderOptions: {
            "appId": "com.electron.Wolverine-Remastered-2022",
            "productName": "Wolverine-Remastered-2022",
            "publish": [
              {
                "provider": "github",
                "owner": "2727-ask",
                "repo": "Wolverine-Remastered-2022"
              }
            ],
            "win": {
              "publish": [
                "github"
              ],
              "target": [
                {
                  "target": "nsis",
                  "arch": [
                    "x64",
                    "ia32"
                  ]
                }
              ]
            }
    
          }
      }
  }
}
