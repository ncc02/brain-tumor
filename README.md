![Video Demo](https://github.com/ncc02/brain-tumor/blob/main/brain-tumor.mkv)


![image](https://github.com/ncc02/brain-tumor/assets/53702773/09f0f05c-89a4-4b41-b431-8d1df4143f0e)

Hướng dẫn cài đặt và chạy:


* Frontend ReactJS: (Có thể sử dụng file index.html để thay thế)  


  STEP 1: Đầu tiên cần cài nodejs


  STEP 2: Cài đặt các thư viện cần thiết của react

      npm i

  STEP 3: Chạy react

      npm start

  
* Backend Django (Rest Framework): (Để tránh bị xung đột phiên bản nên cài môi trường ảo)


  STEP 1: Cài môi trường ảo bằng lệnh:

      py -m venv env


  STEP 2: Vào môi trường ảo (window)

      env\Scripts\activate


  STEP 3: Cài đặt các thư viện cần thiết:

      pip install -r requirements.txt

     OR

      pip install django djangorestframework django-cors-headers opencv-python numpy tensorflow
  

  STEP 4: Chạy server django tại thư mục có chứa file manage.py

      py manage.py runserver
