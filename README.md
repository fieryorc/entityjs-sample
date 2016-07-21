EntityJs
========

A sample library that uses entityjs.

Building and Running
--------------------
```
# Make sure you have git,vscode and npm installed in your machine.
git clone https://github.com/fieryorc/entityjs-sample
cd entityjs-sample 
npm install -g gulp typings tsc
npm install
typings install
gulp
```

### To add new typescript definition
```
# Typescript definition files provide the necessary information for Typescript compiler
# to validate type information. This also is the source of intellisense. All typescript
# definitions are maintained and managed by the command typings.

typings install <name-of-tsd> --save --global
```

### To add new dev dependency (mostly not required)
```
# Dev dependencies are node modules that are added to help in build tooling.
# When you add them, you need to run the following command so it saves the dependency
# in the package.json.

npm install <module-name> --save-dev  
```
