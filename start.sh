#!/bin/bash

if [ "$APP_ENV" = "dev" ]; then
    # dev environment specific commands
    php-fpm -F -R &
    npm run dev &
    php bin/console messenger:consume --all
    echo "Starting in dev environment"
else
    # production environment specific commands
    echo "Starting in production environment"
    php-fpm -F -R
fi