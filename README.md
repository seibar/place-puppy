## build

```
GOARCH=amd64 GOOS=linux go build -o bin/lambda server/lambda/main.go
```

## package

```
zip -j bin/lambda.zip bin/*
```