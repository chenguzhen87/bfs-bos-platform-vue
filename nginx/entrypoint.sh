#!/bin/bash
sed -i "s|BASEURL|$BASEURL|g" /usr/share/nginx/html/conf.js
sed -i "s|HOMEURL|$HOMEURL|g" /usr/share/nginx/html/conf.js
sed -i "s|INVITATIONCODEURL|$INVITATIONCODEURL|g" /usr/share/nginx/html/conf.js
# run nginx
exec /usr/sbin/nginx -g "daemon off;"
