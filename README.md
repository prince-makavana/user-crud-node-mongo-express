# Node CRUD APIs

# Installation

1) npm install

2) npm run start

### create user

URL - /user

# required all below body params
name: "test4",
email: "test4@gmail.com",
password: "test@123",
phone: "1234567890"

# Fetch users

URL - /user

page (need to mention page number like 1, 2, 3) 
limit (Can add limit 5, 10 what ever data we want to show in one page)
sortBy (we can sorting based on field like name, email, phone)
sortOrder (can set order like 1 or -1 so 1 means ASC or -1 means DESC)
name (You can filer data basedon any fields like name, email or phone)

# update user

URL - user/:id

pass below details in body

name: "test4",
email: "test4@gmail.com",
password: "test@123",
phone: "1234567890"

# delete user

URL - user/:id

pass userid in path params for delete user
