# MyMatch Deployment Guide

## 🎯 Overview
Hướng dẫn deploy MyMatch React app lên subdomain `mymatch.anhtudev.works`

## 📋 Prerequisites
- Server Ubuntu với IP: `159.223.78.15`
- Domain: `anhtudev.works` đã được cấu hình
- SSH access đến server
- GitHub repository với CI/CD setup

## 🚀 Step-by-Step Deployment

### 1. Cấu hình DNS Records
Thêm các DNS records sau vào domain `anhtudev.works`:

```
Type: A
Name: mymatch
Value: 159.223.78.15
TTL: 300

Type: CNAME  
Name: www.mymatch
Value: mymatch.anhtudev.works
TTL: 300
```

### 2. Upload files lên server
Upload các files cấu hình lên server:

```bash
# Copy files to server
scp mymatch.anhtudev.works.conf root@159.223.78.15:~/
scp server-setup-commands.sh root@159.223.78.15:~/
```

### 3. Chạy setup script trên server

```bash
# SSH vào server
ssh root@159.223.78.15

# Make script executable và chạy
chmod +x server-setup-commands.sh
./server-setup-commands.sh
```

### 4. Kiểm tra DNS propagation
```bash
# Kiểm tra DNS đã propagate chưa
nslookup mymatch.anhtudev.works
dig mymatch.anhtudev.works

# Hoặc dùng online tools:
# https://dnschecker.org/
```

### 5. Setup SSL Certificate
Sau khi DNS đã propagate (thường 5-15 phút):

```bash
# Trên server, chạy lệnh sau:
sudo certbot --nginx -d mymatch.anhtudev.works -d www.mymatch.anhtudev.works
```

### 6. Cấu hình GitHub Secrets
Trong GitHub repository, thêm secret:
- `SERVER_SSH_KEY`: Private SSH key để connect đến server

### 7. Test và Deploy
```bash
# Test local build
npm run build
npm run preview

# Push to main branch để trigger CI/CD
git add .
git commit -m "Setup MyMatch subdomain deployment"
git push origin main
```

## 🔧 Manual Deployment (nếu cần)

Nếu CI/CD chưa hoạt động, có thể deploy thủ công:

```bash
# Build locally
npm run build

# Upload to server
scp -r dist/* root@159.223.78.15:/var/www/mymatch/

# Set permissions
ssh root@159.223.78.15 "chown -R www-data:www-data /var/www/mymatch && chmod -R 755 /var/www/mymatch"
```

## 🧪 Testing

### 1. Basic connectivity
```bash
curl -I http://mymatch.anhtudev.works
curl -I https://mymatch.anhtudev.works
```

### 2. SSL certificate
```bash
openssl s_client -connect mymatch.anhtudev.works:443 -servername mymatch.anhtudev.works
```

### 3. Performance test
- GTmetrix: https://gtmetrix.com/
- PageSpeed Insights: https://pagespeed.web.dev/

## 📝 Nginx Configuration Features

Cấu hình Nginx đã được tối ưu với:

✅ **SPA Support**: `try_files $uri $uri/ /index.html;`  
✅ **Static file caching**: Cache 1 năm cho JS/CSS/images  
✅ **Gzip compression**: Giảm size transfer  
✅ **Security headers**: XSS protection, content type sniffing  
✅ **SSL ready**: Sẵn sàng cho Certbot  
✅ **WWW redirect**: www.mymatch.anhtudev.works → mymatch.anhtudev.works  

## 🔍 Troubleshooting

### Common Issues:

#### 1. DNS không resolve
```bash
# Kiểm tra DNS
nslookup mymatch.anhtudev.works
# Nếu chưa có, đợi thêm hoặc kiểm tra lại DNS records
```

#### 2. Nginx 502/504 errors
```bash
# Kiểm tra Nginx status
sudo systemctl status nginx
sudo nginx -t

# Xem logs
sudo tail -f /var/log/nginx/error.log
```

#### 3. SSL certificate issues
```bash
# Kiểm tra certificate
sudo certbot certificates

# Renew nếu cần
sudo certbot renew --dry-run
```

#### 4. File permissions
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/mymatch
sudo chmod -R 755 /var/www/mymatch
```

#### 5. CI/CD deployment fails
```bash
# Kiểm tra GitHub Actions logs
# Kiểm tra SSH key trong GitHub Secrets
# Test SSH connection manually:
ssh root@159.223.78.15
```

## 📊 Monitoring

### Nginx Access Logs
```bash
sudo tail -f /var/log/nginx/access.log | grep mymatch
```

### Error Logs  
```bash
sudo tail -f /var/log/nginx/error.log
```

### System Resources
```bash
htop
df -h
free -h
```

## 🔒 Security Checklist

- ✅ SSL certificate installed và auto-renewal
- ✅ Security headers configured
- ✅ File permissions properly set
- ✅ SSH key access limited
- ✅ Firewall configured
- ✅ Regular backups scheduled

## 🎉 Success Indicators

Khi setup thành công, bạn sẽ thấy:

1. ✅ `https://mymatch.anhtudev.works` load website
2. ✅ `https://www.mymatch.anhtudev.works` redirect to non-www
3. ✅ SSL certificate valid (green lock icon)
4. ✅ GitHub Actions build and deploy successfully
5. ✅ React routing works (refresh page vẫn hoạt động)

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs: Nginx, GitHub Actions
2. Verify DNS propagation
3. Test SSL certificate
4. Check file permissions
5. Verify server connectivity

---

**🚀 Happy Deploying! 🎓** 