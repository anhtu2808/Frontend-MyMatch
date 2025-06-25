# CI/CD Setup Guide for MyMatch

## Overview
This guide explains how to set up Continuous Integration and Continuous Deployment (CI/CD) for the MyMatch application using GitHub Actions.

## Prerequisites

1. **Server Setup**
   - Ubuntu server with public IP: `159.223.78.15`
   - Nginx web server installed
   - Node.js 18+ installed on server
   - SSH access configured

2. **GitHub Repository**
   - Repository with main branch
   - GitHub Secrets configured

## GitHub Secrets Configuration

You need to add the following secret to your GitHub repository:

### SERVER_SSH_KEY
1. Go to your GitHub repository
2. Navigate to `Settings` → `Secrets and variables` → `Actions`
3. Click `New repository secret`
4. Name: `SERVER_SSH_KEY`
5. Value: Your private SSH key content (the content of your `~/.ssh/id_rsa` file)

```bash
# To get your SSH key content:
cat ~/.ssh/id_rsa
```

## Server Configuration

### 1. Create Web Directory
```bash
sudo mkdir -p /var/www/mymatch
sudo chown -R root:root /var/www/mymatch
sudo chmod -R 755 /var/www/mymatch
```

### 2. Nginx Configuration
Create or update `/etc/nginx/sites-available/mymatch`:

```nginx
server {
    listen 80;
    server_name your-domain.com; # Replace with your actual domain
    
    root /var/www/mymatch;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. Enable the Site
```bash
sudo ln -s /etc/nginx/sites-available/mymatch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Workflow Details

The CI/CD pipeline (`.github/workflows/deploy.yml`) performs the following steps:

1. **Trigger**: Automatically runs when code is pushed to the `main` branch
2. **Checkout**: Downloads the latest code from the repository
3. **Setup Node.js**: Installs Node.js version 18
4. **Install Dependencies**: Runs `npm ci` to install all dependencies
5. **Build**: Runs `npm run build` to create the production build
6. **Deploy**: 
   - Sets up SSH connection to the server
   - Clears old files from `/var/www/mymatch/`
   - Uploads new build files via SCP
   - Reloads Nginx to serve the new version

## Local Development

To test the build process locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Ensure the SSH key is correctly added to GitHub Secrets
   - Verify server IP address is correct
   - Check if SSH key has proper permissions on the server

2. **Build Failed**
   - Check if all dependencies are listed in `package.json`
   - Ensure build script works locally
   - Verify Node.js version compatibility

3. **Deployment Failed**
   - Check if `/var/www/mymatch/` directory exists and has proper permissions
   - Verify Nginx configuration is correct
   - Check server logs: `sudo tail -f /var/log/nginx/error.log`

### Debugging Commands

```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check file permissions
ls -la /var/www/mymatch/

# Test SSH connection locally
ssh root@159.223.78.15
```

## Security Considerations

1. **SSH Key Security**
   - Use a dedicated SSH key for deployment
   - Regularly rotate SSH keys
   - Restrict SSH key permissions on the server

2. **Server Security**
   - Keep server packages updated
   - Configure firewall properly
   - Use fail2ban to prevent brute force attacks

3. **Nginx Security**
   - Hide Nginx version
   - Configure security headers
   - Use HTTPS with SSL certificates

## Monitoring

After deployment, monitor:
- Application accessibility via web browser
- Nginx access logs: `/var/log/nginx/access.log`
- Nginx error logs: `/var/log/nginx/error.log`
- Server resource usage: `htop`, `df -h`

## Next Steps

1. **Domain Setup**: Configure your domain to point to the server IP
2. **SSL Certificate**: Install SSL certificate for HTTPS
3. **Monitoring**: Set up uptime monitoring and alerts
4. **Backup**: Implement backup strategy for the application

---

## Support

If you encounter any issues with the CI/CD setup, please check:
1. GitHub Actions logs in the repository
2. Server logs on the deployment server
3. Nginx configuration and status

For additional help, refer to:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html) 