# def userfa():

#     url='https://jsonplaceholder.typicode.com/posts'
#     response=requests.get(url)

#     posts=response.json()
#     for i in posts:
#             user_instance =User.objects.get(id=i['userId'])
      
#             post, created = Post.objects.get_or_create(
#                 title=i['title'],
#                 content=i['body'],
                
#                 user=user_instance
#                 )

# ---------------------------

# def userfa():

#         url='https://jsonplaceholder.org/users'
#         response=requests.get(url)
    
        
#         users=response.json()

#         for i in users:
                
        
#                 user, created = User.objects.get_or_create(
#                     firstname=i['firstname'],
#                     lastname=i['lastname'],
                    
#                     email=i['email'])

# ----------------------------

# def userfa():

#     url='https://jsonplaceholder.org/comments'
#     response=requests.get(url)
   
#     if response.status_code == 200:
#         posts=response.json()
#         for i in posts:
            
                
#             user_instance =User.objects.get(id=i['userId'])
#             post_instance =Post.objects.get(id=i['postId'])
            
           
#             post, created = comment.objects.get_or_create(
#                 content=i['comment'],
#                 post=post_instance,
                
#                 user=user_instance  )