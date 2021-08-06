echo "Assuming IAM role"
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN
assumeRoleResponse=($(
aws sts assume-role --role-arn "arn:aws:iam::965776723730:role/DefaultAccountAccessRole" \
    --role-session-name "session-$(Guidgen)" --query '[Credentials.AccessKeyId,Credentials.SecretAccessKey,Credentials.SessionToken]' \
    --output text \
    --profile ct-sbx
))

export AWS_ACCESS_KEY_ID=${assumeRoleResponse[0]}
export AWS_SECRET_ACCESS_KEY=${assumeRoleResponse[1]}
export AWS_SESSION_TOKEN=${assumeRoleResponse[2]}

cat << EOF >  .aws.env
export AWS_ACCESS_KEY_ID=${assumeRoleResponse[0]}
export AWS_SECRET_ACCESS_KEY=${assumeRoleResponse[1]}
export AWS_SESSION_TOKEN=${assumeRoleResponse[2]}
EOF