 #!/bin/sh

ENV=$1

if [ "$ENV" = "sbx" ]
then
    TARGET_ROLE="arn:aws:iam::965776723730:role/DefaultAccountAccessRole"
    PROFILE="ct-sbx"
elif [ "$ENV" = "prd" ]
then
    TARGET_ROLE="arn:aws:iam::904828318817:role/DefaultAccountAccessRole"
    PROFILE="badatt-dev-prd"
fi

echo "Assuming IAM role ${TARGET_ROLE}"

TEMP_ROLE=$(
aws sts assume-role --role-arn ${TARGET_ROLE} \
    --role-session-name "session-$(uuidgen)" \
    --profile ${PROFILE}
)

AWS_ACCESS_KEY_ID=$(echo ${TEMP_ROLE} | jq -r '.Credentials.AccessKeyId')
AWS_SECRET_ACCESS_KEY=$(echo ${TEMP_ROLE} | jq -r '.Credentials.SecretAccessKey')
AWS_SESSION_TOKEN=$(echo ${TEMP_ROLE} | jq -r '.Credentials.SessionToken')

export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN

cat << EOF >  .aws.env
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN
EOF