# Sử dụng base image Node.js với phiên bản 20-alpine nhẹ
FROM node:20

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json vào container để cài đặt dependencies
COPY package.json package-lock.json ./

# Cài đặt các dependencies bằng npm
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build dự án cho production
RUN npm run build

# Chỉ định thư mục dist sẽ chứa code đã build
WORKDIR /app/dist

# Mở cổng 4173 
EXPOSE 4173

CMD ["npm", "run", "preview"]
