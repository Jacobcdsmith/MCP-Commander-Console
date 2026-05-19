# 🚀 MCP Server Docker Hub - Complete Guide

A badass, production-ready Docker orchestration for your Enhanced MCP Server with real-time analytics, monitoring, and visualization.

## 🎯 What You Get

This Docker hub provides a complete, scalable infrastructure:

- **MCP Server**: Your enhanced Model Context Protocol server with 13 powerful tools
- **Real-time Analytics**: Custom analytics service tracking every tool execution
- **Prometheus**: Industry-standard metrics aggregation and alerting
- **Grafana**: Beautiful dashboards and visualizations
- **Redis**: High-performance caching and data persistence
- **Nginx**: Production-grade reverse proxy and load balancer
- **Node Exporter**: System metrics collection
- **cAdvisor**: Container performance monitoring

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        NGINX (Port 80)                      │
│                   Reverse Proxy & Load Balancer             │
└────────┬────────────┬────────────┬──────────────────────────┘
         │            │            │
    ┌────▼────┐  ┌────▼────┐  ┌────▼────┐
    │  MCP    │  │ Grafana │  │Analytics│
    │ Server  │  │  :3000  │  │  :3002  │
    │  :3001  │  │         │  │         │
    └────┬────┘  └────┬────┘  └────┬────┘
         │            │            │
         └────────────┴────────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
    ┌────▼────┐            ┌───────▼──────┐
    │  Redis  │            │  Prometheus  │
    │  :6379  │            │    :9090     │
    └─────────┘            └──────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB RAM minimum
- 10GB disk space

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd my-mcp-server
   ```

2. **Install dependencies**:
   ```bash
   make install
   # or manually:
   npm install
   cd analytics && npm install
   ```

3. **Configure environment** (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Build and start all services**:
   ```bash
   make up
   # or:
   docker-compose up -d
   ```

5. **Access the dashboards**:
   - **MCP Server Dashboard**: http://localhost:3001
   - **Grafana Analytics**: http://localhost:3000 (admin/mcpadmin123)
   - **Analytics Service**: http://localhost:3002
   - **Prometheus**: http://localhost:9090
   - **cAdvisor**: http://localhost:8080

## 📊 Service Details

### MCP Server (Port 3001)
Your main Enhanced MCP Server with:
- 13 powerful tools (Git, File System, System, Data Processing)
- Beautiful command-grid-themed dashboard
- HTTP API endpoints
- MCP protocol support via stdio

### Analytics Service (Port 3002)
Real-time analytics engine providing:
- Tool execution tracking
- Performance metrics
- Error rate monitoring
- User activity analytics
- System health scoring

**API Endpoints**:
```bash
POST /api/track/execution  # Track tool execution
POST /api/track/error      # Track errors
GET  /api/stats/tools      # Tool statistics
GET  /api/stats/users      # User analytics
GET  /api/health           # System health
GET  /metrics              # Prometheus metrics
```

### Grafana (Port 3000)
Beautiful visualization dashboards:
- **Default credentials**: admin/mcpadmin123
- Pre-configured Prometheus datasource
- MCP Overview dashboard included
- Real-time metrics visualization

**Featured Dashboards**:
- Total tool executions
- Active users
- System health score
- Error rates
- Tool popularity rankings
- Execution duration histograms

### Prometheus (Port 9090)
Metrics aggregation with:
- 15-second scrape intervals
- 30-day data retention
- Alert rules configured
- Multi-target monitoring

**Monitored Metrics**:
- `mcp_tool_executions_total` - Tool execution counter
- `mcp_tool_execution_duration_seconds` - Execution latency
- `mcp_active_users` - Active user count
- `mcp_error_rate` - Error percentage
- `mcp_system_health` - Health score (0-100)
- `mcp_tool_popularity` - Tool usage rankings

### Redis (Port 6379)
High-performance cache with:
- 256MB memory limit
- LRU eviction policy
- AOF persistence enabled
- 30-day TTL on analytics data

### Nginx (Port 80)
Production reverse proxy:
- Rate limiting (100 req/s)
- Connection pooling
- Gzip compression
- Health checks
- SSL/TLS ready

## 🛠️ Makefile Commands

```bash
make help        # Show all available commands
make build       # Build all Docker images
make up          # Start all services
make down        # Stop all services
make restart     # Restart all services
make logs        # View logs from all services
make clean       # Remove containers, volumes, images
make dev         # Start in development mode
make prod        # Start in production mode
make status      # Show service status
make health      # Health check all services
make analytics   # Open analytics dashboard
make grafana     # Open Grafana dashboard
make prometheus  # Open Prometheus
make scale-up    # Scale MCP server to 3 instances
make scale-down  # Scale back to 1 instance
make backup      # Backup Redis and Prometheus data
```

## 📈 Monitoring & Alerts

### Pre-configured Alerts

The system includes production-ready alerts:

1. **HighErrorRate** - Warns when error rate exceeds 10%
2. **CriticalErrorRate** - Critical alert at 25% errors
3. **LowSystemHealth** - System health below 50
4. **CriticalSystemHealth** - Health below 25
5. **HighToolLatency** - 95th percentile > 5 seconds
6. **ContainerDown** - Any container offline
7. **HighMemoryUsage** - Available memory < 10%
8. **HighCPUUsage** - CPU usage > 80% for 10 min

### Health Checks

All services include health checks:
```bash
# Quick health check
make health

# Manual checks
curl http://localhost:3001/api/status
curl http://localhost:3002/api/health
curl http://localhost:9090/-/healthy
curl http://localhost:3000/api/health
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:
```env
NODE_ENV=production
PORT=3001
DEBUG=0
REDIS_HOST=redis
REDIS_PORT=6379
PROMETHEUS_ENABLED=true
GF_SECURITY_ADMIN_PASSWORD=your-secure-password
```

### Scaling

Scale the MCP server horizontally:
```bash
docker-compose up -d --scale mcp-server=3
```

Nginx automatically load balances across all instances.

### Persistence

Data is persisted in Docker volumes:
- `mcp-data` - Application data
- `redis-data` - Redis cache and AOF
- `prometheus-data` - Metrics (30 days)
- `grafana-data` - Dashboards and settings

### Backup & Restore

**Backup**:
```bash
make backup
# Creates timestamped backups in ./backups/
```

**Restore**:
```bash
# Stop services
make down

# Restore volumes
docker run --rm -v mcp_prometheus-data:/data -v $(PWD)/backups:/backup \
  alpine tar xzf /backup/prometheus-YYYYMMDD-HHMMSS.tar.gz -C /data

# Restart
make up
```

## 🔒 Security

### Production Hardening

1. **Change default passwords**:
   ```env
   GF_SECURITY_ADMIN_PASSWORD=strong-password-here
   ```

2. **Enable SSL/TLS**:
   - Uncomment HTTPS server block in `nginx/nginx.conf`
   - Add SSL certificates to `nginx/ssl/`

3. **Configure firewall**:
   ```bash
   # Only expose Nginx
   ufw allow 80/tcp
   ufw allow 443/tcp
   ```

4. **Restrict Redis access**:
   Edit `redis.conf`:
   ```conf
   requirepass your-redis-password
   ```

5. **Use secrets for sensitive data**:
   ```bash
   docker secret create redis_password ./secrets/redis_password.txt
   ```

## 🐛 Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs

# Check specific service
docker-compose logs mcp-server

# Rebuild from scratch
make clean
make build
make up
```

### Analytics not tracking
```bash
# Check analytics service
curl http://localhost:3002/api/health

# Check Redis connection
docker-compose exec redis redis-cli ping

# View analytics logs
docker-compose logs analytics-service
```

### Grafana dashboards not loading
```bash
# Restart Grafana
docker-compose restart grafana

# Check Prometheus datasource
curl http://localhost:3000/api/datasources

# Rebuild provisioning
docker-compose up -d --force-recreate grafana
```

### High memory usage
```bash
# Check container stats
docker stats

# Adjust Redis memory limit in docker-compose.yml
# Increase system resources
```

## 📊 Performance Tuning

### For High Traffic

Edit `docker-compose.yml`:

```yaml
mcp-server:
  deploy:
    replicas: 5
    resources:
      limits:
        cpus: '2'
        memory: 1G
      reservations:
        cpus: '0.5'
        memory: 512M
```

### Redis Optimization

Edit `redis.conf`:
```conf
maxmemory 512mb              # Increase for more caching
maxmemory-policy allkeys-lfu # Least frequently used
```

### Prometheus Retention

Edit `prometheus/prometheus.yml`:
```yaml
storage:
  tsdb:
    retention.time: 90d  # Keep 90 days of data
```

## 🚀 Development Mode

Start with hot-reloading:
```bash
make dev
# or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Changes to source files automatically reload the servers.

## 📝 Logs

View logs:
```bash
# All services
make logs

# Specific service
docker-compose logs -f mcp-server

# Last 100 lines
docker-compose logs --tail=100

# Since timestamp
docker-compose logs --since 2024-01-01T00:00:00
```

## 🎯 Next Steps

1. **Customize dashboards** - Edit Grafana dashboards to your needs
2. **Add alert channels** - Configure Slack/email notifications
3. **Set up CI/CD** - Automate deployments
4. **Enable HTTPS** - Add SSL certificates
5. **Monitor production** - Set up external monitoring
6. **Scale horizontally** - Add more MCP server instances
7. **Optimize caching** - Tune Redis for your workload

## 🤝 Contributing

Found an issue or have an improvement?
- Open an issue
- Submit a pull request
- Share your custom dashboards

## 📄 License

ISC License - See package.json

## 🎉 That's It!

You now have a production-ready, scalable MCP server hub with:
- ✅ Real-time analytics
- ✅ Beautiful dashboards
- ✅ Comprehensive monitoring
- ✅ Auto-scaling capability
- ✅ High availability
- ✅ Performance metrics
- ✅ Error tracking
- ✅ Health monitoring

**Happy coding! 🚀**
