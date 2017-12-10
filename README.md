# [www.placepuppy.net](http://www.placepuppy.net)

## start up

```bash
AWS_ACCESS_KEY_ID=<aws-access-id> AWS_SECRET_ACCESS_KEY=<aws-secret-key> PORT=8080 node dist/server.js
```

## s2i/docker

Install s2i: https://github.com/openshift/source-to-image

```bash
s2i build . -c registry.access.redhat.com/rhscl/nodejs-6-rhel7 placepuppy
docker run -p 8080:8080 placepuppy
```