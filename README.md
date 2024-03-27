# Node CRUD APIs

# Installation

1) npm install

2) npm run start

# create user

URL - /user

### required all below body params
name: "test4"
email: "test4@gmail.com"
password: "test@123"
phone: "1234567890"

# Fetch users

URL - /user

### Query params

1) page (need to mention page number like 1, 2, 3) 
2) limit (Can add limit 5, 10 what ever data we want to show in one page)
3) sortBy (we can sorting based on field like name, email, phone)
4) sortOrder (can set order like 1 or -1 so 1 means ASC or -1 means DESC)
5) name (You can filer data basedon any fields like name, email or phone)

# Update user

URL - user/:id

Required all below details in body

1) name: "test4",
2) email: "test4@gmail.com",
3) password: "test@123",
4) phone: "1234567890"

# Delete user

URL - user/:id

pass userid in path params for delete user
