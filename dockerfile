# Sử dụng base image Node.js với phiên bản 20
FROM node:20

# Đặt thư mục làm việc trong container
WORKDIR /app

# Không cần cài đặt Yarn nếu đã có sẵn trong image node:20
# Sao chép file package.json và yarn.lock (nếu có) vào container
COPY package.json yarn.lock* ./

# Cài đặt các dependencies bằng Yarn với frozen-lockfile để đảm bảo không thay đổi lockfile
RUN yarn install --frozen-lockfile

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build dự án cho production
RUN yarn build

# Đặt thư mục làm việc cho dist để chuẩn bị chạy ứng dụng sau khi build
WORKDIR /app/dist

# Mở cổng 4173
EXPOSE 4173

# Chạy ứng dụng bằng lệnh yarn preview
CMD ["yarn", "preview", "--host"]

