unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN

ENV=$1

if [ ${ENV} == "sbx" ]
then
    TARGET_ROLE="arn:aws:iam::965776723730:role/DefaultAccountAccessRole"
    PROFILE="ct-sbx"
elif [ ${ENV} == "prd" ]
then
    TARGET_ROLE="arn:aws:iam::904828318817:role/DefaultAccountAccessRole"
    PROFILE="badatt-dev-prd"
fi

echo "Assuming IAM role ${TARGET_ROLE}"

assumeRoleResponse=($(
aws sts assume-role --role-arn ${TARGET_ROLE} \
    --role-session-name "session-$(Guidgen)" --query '[Credentials.AccessKeyId,Credentials.SecretAccessKey,Credentials.SessionToken]' \
    --output text \
    --profile ${PROFILE}
))

export AWS_ACCESS_KEY_ID=${assumeRoleResponse[0]}
export AWS_SECRET_ACCESS_KEY=${assumeRoleResponse[1]}
export AWS_SESSION_TOKEN=${assumeRoleResponse[2]}

cat << EOF >  .aws.env
AWS_ACCESS_KEY_ID=${assumeRoleResponse[0]}
AWS_SECRET_ACCESS_KEY=${assumeRoleResponse[1]}
AWS_SESSION_TOKEN=${assumeRoleResponse[2]}
EOF