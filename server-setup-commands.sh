#!/bin/bash

# Script để setup server cho MyMatch subdomain
# Chạy trên server với quyền root

echo "🚀 Setting up MyMatch subdomain server..."

# 1. Tạo thư mục cho website
echo "📁 Creating website directory..."
mkdir -p /var/www/mymatch
chown -R www-data:www-data /var/www/mymatch
chmod -R 755 /var/www/mymatch

# 2. Tạo file index.html tạm thời để test
echo "📄 Creating temporary index.html..."
cat > /var/www/mymatch/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>MyMatch - Coming Soon</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            margin-top: 100px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 50px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
        h1 { font-size: 3em; margin-bottom: 20px; }
        p { font-size: 1.2em; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 MyMatch</h1>
        <p>Teacher Review Platform</p>
        <p>Coming Soon...</p>
    </div>
</body>
</html>
EOF

# 3. Copy file cấu hình Nginx
echo "⚙️ Setting up Nginx configuration..."
cp mymatch.anhtudev.works.conf /etc/nginx/sites-available/mymatch.anhtudev.works

# 4. Enable site
echo "🔗 Enabling Nginx site..."
ln -sf /etc/nginx/sites-available/mymatch.anhtudev.works /etc/nginx/sites-enabled/

# 5. Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    
    # 6. Reload Nginx
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx
    
    echo "✅ Nginx reloaded successfully"
else
    echo "❌ Nginx configuration has errors. Please check and fix."
    exit 1
fi

# 7. Setup SSL with Certbot
echo "🔒 Setting up SSL certificate..."
echo "Run this command manually after DNS is configured:"
echo "sudo certbot --nginx -d mymatch.anhtudev.works -d www.mymatch.anhtudev.works"

# 8. Hiển thị thông tin DNS cần thiết
echo ""
echo "📋 DNS Configuration Required:"
echo "================================"
echo "Add these DNS records to your domain:"
echo ""
echo "Type: A"
echo "Name: mymatch"
echo "Value: 159.223.78.15"
echo "TTL: 300"
echo ""
echo "Type: CNAME"
echo "Name: www.mymatch"
echo "Value: mymatch.anhtudev.works"
echo "TTL: 300"
echo ""
echo "🎉 Server setup completed!"
echo "🌐 Your site will be available at: https://mymatch.anhtudev.works"
echo ""
echo "📝 Next steps:"
echo "1. Configure DNS records as shown above"
echo "2. Wait for DNS propagation (usually 5-15 minutes)"
echo "3. Run SSL certificate setup: sudo certbot --nginx -d mymatch.anhtudev.works"
echo "4. Test the site in browser"
echo "5. Deploy your React app using the CI/CD pipeline" 