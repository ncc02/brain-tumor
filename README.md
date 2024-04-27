![image](https://github.com/ncc02/brain-tumor/assets/53702773/09f0f05c-89a4-4b41-b431-8d1df4143f0e)

Hướng dẫn cài đặt và chạy:

* Frontend ReactJS: // Có thể sử dụng file index.html để thay thế  

  <1> Đầu tiên cần cài nodejs

  <2> Cài đặt các thư viện cần thiết của react

      npm i
  <3>  Chạy react

      npm start
* Backend Django (Rest Framework): //Để tránh bị xung đột phiên bản nên cài môi trường ảo

  <1> Cài môi trường ảo bằng lệnh (window):

      py -m venv env

  <2> Vào môi trường ảo

      env\Scripts\activate

  <3> Cài đặt các thư viện cần thiết:

      pip install -r requirements.txt

     OR

      pip install django djangorestframework django-cors-headers opencv-python numpy tensorflow
  
  <4> Chạy server django tại thư mục có chứa file manage.py

      py manage.py runserver
