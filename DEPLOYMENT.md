# Deployment Guide

This guide covers deploying Cousin Tony's Recipes to production.

## Pre-Deployment Checklist

- [ ] All features tested in development store
- [ ] Database migrations ready
- [ ] Environment variables documented
- [ ] Error handling implemented
- [ ] Security review completed
- [ ] Performance optimizations applied
- [ ] Documentation updated
- [ ] App listing prepared (if publishing to App Store)

## Deployment Options

### Option 1: Shopify Oxygen (Recommended)

Shopify's hosting platform optimized for Shopify apps.

#### Setup

1. **Install Oxygen CLI**:
   ```bash
   npm install -g @shopify/oxygen-cli
   ```

2. **Configure oxygen.config.js**:
   ```javascript
   export default {
     buildCommand: "npm run build",
     startCommand: "npm start",
     env: {
       SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
       SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
     },
   };
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Set Environment Variables**:
   ```bash
   oxygen env:set SHOPIFY_API_KEY=your_key
   oxygen env:set SHOPIFY_API_SECRET=your_secret
   oxygen env:set DATABASE_URL=your_database_url
   ```

### Option 2: Heroku

Popular platform with easy deployment.

#### Setup

1. **Create Heroku App**:
   ```bash
   heroku create cousin-tonys-recipes
   ```

2. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set SHOPIFY_API_KEY=your_key
   heroku config:set SHOPIFY_API_SECRET=your_secret
   heroku config:set SCOPES=write_products,read_products,write_metaobjects,read_metaobjects
   ```

4. **Update Prisma for PostgreSQL**:
   
   Edit `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

5. **Add Procfile**:
   ```
   web: npm start
   release: npx prisma migrate deploy
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

### Option 3: Vercel

Fast edge deployment with global CDN.

#### Setup

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Create vercel.json**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/"
       }
     ]
   }
   ```

3. **Configure Environment Variables**:
   ```bash
   vercel env add SHOPIFY_API_KEY
   vercel env add SHOPIFY_API_SECRET
   vercel env add DATABASE_URL
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 4: Railway

Modern platform with automatic deployments.

#### Setup

1. **Connect Repository**:
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo

2. **Add PostgreSQL**:
   - Click "New" → "Database" → "PostgreSQL"

3. **Set Environment Variables**:
   - Add `SHOPIFY_API_KEY`
   - Add `SHOPIFY_API_SECRET`
   - Add `SCOPES`
   - `DATABASE_URL` is automatically set

4. **Deploy**:
   - Railway automatically deploys on git push

### Option 5: Custom VPS (Digital Ocean, AWS, etc.)

Full control deployment on your own server.

#### Setup

1. **Provision Server**:
   - Ubuntu 22.04 LTS recommended
   - Minimum 1GB RAM, 1 CPU

2. **Install Dependencies**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PostgreSQL
   sudo apt install -y postgresql postgresql-contrib
   
   # Install PM2
   sudo npm install -g pm2
   ```

3. **Clone Repository**:
   ```bash
   cd /var/www
   git clone https://github.com/agmarcotte/cousin-tonys-recipes.git
   cd cousin-tonys-recipes
   npm install
   ```

4. **Set Up Database**:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE recipes;
   CREATE USER recipesuser WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE recipes TO recipesuser;
   \q
   ```

5. **Configure Environment**:
   ```bash
   cp .env.example .env
   nano .env
   # Add all environment variables
   ```

6. **Run Migrations**:
   ```bash
   npx prisma migrate deploy
   ```

7. **Start with PM2**:
   ```bash
   pm2 start npm --name "cousin-tonys-recipes" -- start
   pm2 save
   pm2 startup
   ```

8. **Set Up Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Database Migration

### For Production Database

1. **Review Migrations**:
   ```bash
   npx prisma migrate diff \
     --from-empty \
     --to-schema-datamodel prisma/schema.prisma \
     --script
   ```

2. **Create Migration**:
   ```bash
   npx prisma migrate dev --name production_init
   ```

3. **Deploy to Production**:
   ```bash
   npx prisma migrate deploy
   ```

## Environment Variables

Required environment variables for production:

```bash
# Shopify App Configuration
SHOPIFY_API_KEY=your_production_api_key
SHOPIFY_API_SECRET=your_production_api_secret
SCOPES=write_products,read_products,write_metaobjects,read_metaobjects

# Application URL
SHOPIFY_APP_URL=https://your-app-domain.com

# Database (PostgreSQL recommended for production)
DATABASE_URL=postgresql://user:password@host:5432/database

# Optional: Session Secret
SESSION_SECRET=random_string_for_session_encryption

# Optional: Sentry for Error Tracking
SENTRY_DSN=your_sentry_dsn

# Optional: Analytics
ANALYTICS_ID=your_analytics_id
```

## Post-Deployment Steps

### 1. Update Shopify App Settings

In your Shopify Partner dashboard:
- Update App URL to production URL
- Update Redirect URLs
- Verify OAuth settings
- Test installation flow

### 2. Set Up Monitoring

**Sentry for Error Tracking**:
```bash
npm install @sentry/remix
```

Add to `app/entry.server.jsx`:
```javascript
import * as Sentry from "@sentry/remix";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

**UptimeRobot for Uptime Monitoring**:
- Create monitor at [uptimerobot.com](https://uptimerobot.com)
- Set up alerts for downtime

### 3. Set Up Backups

**Database Backups**:
```bash
# Automated daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U recipesuser recipes > /backups/recipes_$DATE.sql
```

Add to crontab:
```bash
0 2 * * * /path/to/backup-script.sh
```

### 4. Performance Optimization

**Enable Caching**:
- Use Redis for session storage
- Cache frequently accessed data
- Enable CDN for static assets

**Database Optimization**:
- Add indexes for frequently queried fields
- Analyze and optimize slow queries
- Set up connection pooling

### 5. Security Hardening

**HTTPS Only**:
- Enforce HTTPS in production
- Use HSTS headers

**Rate Limiting**:
```javascript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

**Security Headers**:
```javascript
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
```

## Scaling Considerations

### Horizontal Scaling

For high traffic:
- Use load balancer (Nginx, HAProxy)
- Deploy multiple app instances
- Use shared session storage (Redis)
- Implement queue system for background jobs

### Database Scaling

- Read replicas for read-heavy workloads
- Connection pooling with PgBouncer
- Consider managed database service

### CDN Setup

Use CDN for static assets:
- Cloudflare
- AWS CloudFront
- Fastly

## Rollback Plan

If issues occur after deployment:

1. **Quick Rollback**:
   ```bash
   # Git
   git revert HEAD
   git push
   
   # Heroku
   heroku rollback
   
   # PM2
   pm2 restart cousin-tonys-recipes
   ```

2. **Database Rollback**:
   ```bash
   npx prisma migrate resolve --rolled-back migration_name
   ```

## Monitoring and Alerts

Set up alerts for:
- Application errors (Sentry)
- High response times (New Relic, DataDog)
- Database performance issues
- High memory/CPU usage
- Failed API calls

## Maintenance Mode

Create `public/maintenance.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Maintenance</title>
</head>
<body>
  <h1>Under Maintenance</h1>
  <p>We'll be back shortly!</p>
</body>
</html>
```

Enable with Nginx:
```nginx
if (-f /var/www/maintenance.html) {
    return 503;
}

error_page 503 @maintenance;
location @maintenance {
    rewrite ^(.*)$ /maintenance.html break;
}
```

## Support and Troubleshooting

Common production issues:

**Database Connection Errors**:
- Check DATABASE_URL is correct
- Verify database is running
- Check connection limits

**OAuth Errors**:
- Verify redirect URLs match
- Check API credentials
- Ensure HTTPS is enabled

**Performance Issues**:
- Check database indexes
- Monitor slow queries
- Review application logs
- Check for memory leaks

## Success Metrics

Track these metrics:
- App installation rate
- Active users
- Recipe creation rate
- Error rate
- Response time
- User satisfaction

## Conclusion

After deployment:
1. Monitor for 24-48 hours
2. Address any issues promptly
3. Gather user feedback
4. Plan for continuous improvements

Need help? Open an issue on GitHub or contact support.
