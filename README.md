# Scaping FX

Gold price tracking application.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Database

```bash
# Run migrations
pnpm prisma migrate dev

# Seed database
pnpm prisma db seed

# Reset database (dev only)
pnpm prisma migrate reset
```

## Production with PM2

### Start Next.js app

```bash
pm2 start pnpm --name "next-js" -- start
```

### Start fetch-price worker

```bash
pm2 start pnpm --name "fetch-price" -- fetch-price
```

### PM2 commands

```bash
# List all processes
pm2 list

# View logs
pm2 logs <app-name>

# Stop process
pm2 stop <app-name>

# Restart process
pm2 restart <app-name>

# Delete process
pm2 delete <app-name>

# Save process list (auto-start on reboot)
pm2 save
pm2 startup
```
