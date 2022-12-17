Test database

Reference:
https://attacomsian.com/blog/nodejs-mongodb-local-connection
https://attacomsian.com/blog/install-mongodb-macos

Installations:
`brew tap mongodb/brew
  `brew install mongodb-community`
  `brew tap homebrew/services`

Start the servicce:
`brew services start mongodb-community`

Check the service is working:
`brew services list`

Stop/reboot the serivce:
`brew services stop mongodb-community`
`brew services restart mongodb-community`

Aliases: add this to `~/.zshrc`

```
alias mongod-start="brew services run mongodb-community"
alias mongod-status="brew services list"
alias mongod-stop="brew services stop mongodb-community"
```

Then run:
`source ~/.zshrc`
