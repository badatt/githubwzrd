```
 ██████╗ ██╗████████╗██╗  ██╗██╗   ██╗██████╗ ██╗    ██╗███████╗██████╗ ██████╗
██╔════╝ ██║╚══██╔══╝██║  ██║██║   ██║██╔══██╗██║    ██║╚══███╔╝██╔══██╗██╔══██╗
██║  ███╗██║   ██║   ███████║██║   ██║██████╔╝██║ █╗ ██║  ███╔╝ ██████╔╝██║  ██║
██║   ██║██║   ██║   ██╔══██║██║   ██║██╔══██╗██║███╗██║ ███╔╝  ██╔══██╗██║  ██║
╚██████╔╝██║   ██║   ██║  ██║╚██████╔╝██████╔╝╚███╔███╔╝███████╗██║  ██║██████╔╝
 ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═════╝
```

[![API deployment to sbx](https://github.com/badatt/githubwzrd/actions/workflows/deploy-api-sbx.yml/badge.svg)](https://github.com/badatt/githubwzrd/actions/workflows/deploy-api-sbx.yml)
[![Web client deployment to sbx](https://github.com/badatt/githubwzrd/actions/workflows/deploy-web-client-sbx.yml/badge.svg)](https://github.com/badatt/githubwzrd/actions/workflows/deploy-web-client-sbx.yml)

## Commands

```shell
$ node_modules/.bin/jake -t
jake build-api-dev        # Build API project
jake run-api-dev          # Run API in dev mode in local
jake build-client-dev     # Build Client project
jake run-client-dev       # Run Client in dev mode in local
jake build-api-serverless # Buid API project for serverless deployment
jake cdk-sbx              # Deploy infrastructure in sbx
```

## config goes here
