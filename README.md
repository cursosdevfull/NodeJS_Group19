# NodeJS con https

### Generar certificados

```
openssl genrsa -out certificates/curso-nodejs19.pem 2048
openssl req -new -x509 -key certificates/curso-nodejs19.pem -out certificates/curso-nodejs19-public.pem -days 365
```
