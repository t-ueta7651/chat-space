json.(@message, :content)
json.user_name @message.user.name
json.id @message.id
json.date @message.created_at.to_s
json.image @message.image.url


# json.created_at @message.created_at
# json.id @message.id
# json.user_name @message.user.name
# json.content @message.content

