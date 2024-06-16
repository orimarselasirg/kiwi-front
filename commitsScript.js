const { exec } = require('child_process')

const message = process.argv[2] || 'bugs fixed'
const gitBranch = process.argv[2] || 'error'

const gitAdd = 'git add .'
const gitCommit = `git commit -m"${message}"`
const gitPush = `git push origin ${gitBranch}`

exec(gitAdd, (err, stdout, stderr) => {
  if (err) {
    console.error(`hubo un error ${stderr}`)
    return
  }
  console.log(`Ejecucion de add ${stdout}`)

  exec(gitCommit, (err, stdout, stderr) => {
    if (err) {
      console.error(`hubo un error enviando el commit ${stderr}`)
      return
    }
    console.log(`Ejecucion del commit ${stdout}`)

    exec(gitPush, (err, stdout, stderr) => {
      if (err) {
        console.error(`hubo un error en el push ${stderr}`)
        return
      }
      console.log(`Ejecucion del push ${stdout}`)
    })
  })
})
