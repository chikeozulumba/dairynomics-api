x=$CI_COMMIT_SHORT_SHA
curl -X POST https://api.heroku.com/apps -H "Accept: application/vnd.heroku+json; version=3" -H "Authorization: Bearer $HEROKU_API_KEY" -H "Content-Type: application/json" -d "{\"name\":\"$PROJECT_NAME-$x\",\"region\":\"eu\"}"
apt-get update -qy
apt-get install -y ruby-dev
gem install dpl
curl https://cli-assets.heroku.com/install.sh | sh
heroku config:set REVIEW_DATABASE_URL=$REVIEW_DATABASE_URL --app $PROJECT_NAME-$x
heroku config:set JWT_SECRET=$JWT_SECRET --app $PROJECT_NAME-$x
heroku config:set COWSOKO_ISS=$COWSOKO_ISS --app $PROJECT_NAME-$x
heroku config:set NODE_ENV=preview --app $PROJECT_NAME-$x
heroku config:set ADMIN_EMAIL=$ADMIN_EMAIL --app $PROJECT_NAME-$x
heroku config:set NPM_CONFIG_PRODUCTION=false --app $PROJECT_NAME-$x
heroku config:set MPESA_CONSUMER_KEY=$MPESA_CONSUMER_KEY --app $PROJECT_NAME-$x
heroku config:set MPESA_CONSUMER_SECRET=$MPESA_CONSUMER_SECRET --app $PROJECT_NAME-$x
heroku config:set MPESA_API_BASE_URL=$MPESA_API_BASE_URL --app $PROJECT_NAME-$x
heroku config:set MPESA_TRANSACTION_CALLBACK_URL=$MPESA_TRANSACTION_CALLBACK_URL --app $PROJECT_NAME-$x
heroku config:set MPESA_BUSINESS_SHORTCODE=$MPESA_BUSINESS_SHORTCODE --app $PROJECT_NAME-$x
heroku config:set MPESA_DEV_PASSKEY=$MPESA_DEV_PASSKEY --app $PROJECT_NAME-$x
heroku config:set MPESA_BUSINESS_TRANSACTION_TYPE=$MPESA_BUSINESS_TRANSACTION_TYPE --app $PROJECT_NAME-$x
dpl --provider=heroku --app=$PROJECT_NAME-$x --api-key=$HEROKU_API_KEY
