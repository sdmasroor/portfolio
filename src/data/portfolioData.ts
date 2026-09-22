export interface SystemDesignNode {
  id: string;
  name: string;
  role: string;
  technology: string;
  latency?: string;
  description: string;
  status: 'active' | 'synced' | 'ready';
}

export interface SystemDesignScenario {
  id: string;
  title: string;
  badge: string;
  summary: string;
  problem: string;
  solution: string;
  keyMetrics: string[];
  designPatterns: string[];
  nodes: SystemDesignNode[];
  connections: { from: string; to: string; label: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Serverless' | 'Full-Stack Enterprise' | 'Distributed Systems' | 'Microservices';
  featured: boolean;
  liveDemoUrl?: string;
  githubUrl?: string;
  summary: string;
  architectureHighlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  codeSnippet?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  clientType?: string;
  projectFocus: string;
  achievements: string[];
  techStack: string[];
  designPatterns: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; highlight: string }[];
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'Cloud & Serverless' | 'Agentic & GenAI' | 'Backend & APIs' | 'Databases & Storage' | 'Architecture' | 'Frontend' | 'DevOps & SRE';
  level: string;
  experience: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    specialization: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    shortBio: string;
    availability: string;
    yearsOfExperience: string;
  };
  heroStats: { label: string; value: string; subtitle: string }[];
  systemDesigns: SystemDesignScenario[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  skillCategories: SkillCategory[];
  techStacks: TechStackItem[];
  certifications: { name: string; issuer: string; year: string }[];
  education: { degree: string; institution: string; location: string };
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Syed Masroor Jan",
    title: "Staff Engineer & Technical Lead",
    specialization: "Cloud Architecture · Agentic AI · Distributed Systems · Full-Stack Platforms",
    location: "Jammu & Kashmir, India",
    email: "sdmasroor0290@gmail.com",
    phone: "+91-9622464714",
    linkedin: "https://www.linkedin.com/in/syed-masroor-jan",
    github: "https://github.com",
    shortBio: "Staff Engineer with 9.6+ years architecting and delivering enterprise-grade, cloud-native platforms across automobile, public sector, education, and banking domains. Proven track record leading engineering teams of 8+, maintaining 99.9% uptime SLAs, cutting release cycles by 35%, and driving sub-200ms latency on critical systems.",
    availability: "Available for Technical Leadership & Staff Engineer Roles",
    yearsOfExperience: "9.6+",
  },

  heroStats: [
    { label: "Production Scale", value: "9.6+ YOE", subtitle: "Enterprise systems & leadership" },
    { label: "Uptime SLA", value: "99.9%", subtitle: "Multi-tenant cloud platforms" },
    { label: "API Latency", value: "<200ms", subtitle: "Optimized serverless endpoints" },
    { label: "Cycle Velocity", value: "35%", subtitle: "Release cycle time reduction" },
    { label: "Cloud Cost", value: "-20%", subtitle: "Infrastructure optimization (IaC)" },
  ],

  systemDesigns: [
    {
      id: "multi-tenant-rls",
      title: "2-Tier Row-Level Security (RLS) & AsyncLocalStorage Multi-Tenancy",
      badge: "Enterprise ERP Architecture",
      summary: "Database-enforced multi-tenant isolation without data leakage risks, powered by Fastify AsyncLocalStorage and PostgreSQL 16 RLS policies.",
      problem: "Traditional application-level tenant filtering (e.g. `WHERE tenant_id = :id`) is prone to developer oversight, SQL injection escapes, and data leakage across shared SaaS databases.",
      solution: "Implemented kernel-level data isolation where incoming JWT tokens set an immutable tenant context in Node.js `AsyncLocalStorage`. A TypeORM interceptor injects `SET LOCAL app.current_tenant_id` at transaction start, enforcing PostgreSQL native RLS at the engine level.",
      keyMetrics: ["Zero cross-tenant leakage", "Sub-15ms overhead per tenant switch", "15 enterprise modules isolated"],
      designPatterns: ["Interceptor Pattern", "Repository Pattern", "Request-Scoped Context", "Row-Level Security"],
      nodes: [
        { id: "client", name: "Client Gateway", role: "Next.js / Vite SPA", technology: "React 19 + TanStack", latency: "5ms", description: "Sends requests with signed JWT containing tenantId & role permissions.", status: "active" },
        { id: "fastify", name: "Fastify Web Server", role: "High-Throughput API", technology: "NestJS 10 + Fastify", latency: "12ms", description: "Extracts tenant ID and initializes Node.js AsyncLocalStorage execution scope.", status: "active" },
        { id: "als", name: "AsyncLocalStorage Context", role: "Execution Boundary", technology: "Node.js ALS Core", latency: "<1ms", description: "Guarantees thread-safe request context propagation without variable leaking.", status: "ready" },
        { id: "interceptor", name: "Tenant Interceptor", role: "SQL Connection Wrapper", technology: "TypeORM Hook", latency: "2ms", description: "Executes `SET LOCAL app.current_tenant_id` on the pooled DB connection.", status: "synced" },
        { id: "postgres", name: "PostgreSQL 16 Engine", role: "Database RLS Enforcement", technology: "PostgreSQL 16 + RLS", latency: "8ms", description: "Database engine evaluates `current_setting('app.current_tenant_id')` on every row read/write.", status: "synced" },
        { id: "bullmq", name: "BullMQ Tenant Workers", role: "Background Queues", technology: "Redis 7 + BullMQ", latency: "Async", description: "Workers consume async jobs with tenant context intact for isolated exports & AI jobs.", status: "ready" },
      ],
      connections: [
        { from: "client", to: "fastify", label: "JWT Auth Bearer" },
        { from: "fastify", to: "als", label: "Mount Tenant Scope" },
        { from: "als", to: "interceptor", label: "Provide Tenant Context" },
        { from: "interceptor", to: "postgres", label: "SET LOCAL tenant_id" },
        { from: "fastify", to: "bullmq", label: "Dispatch Background Work" },
      ],
    },
    {
      id: "serverless-agentic-ai",
      title: "Autonomous Serverless Content Engine & Agentic AI Pipeline",
      badge: "Job-to-Instagram Engine",
      summary: "Completely serverless, event-driven state machine orchestrating multi-source ingestion, Claude 3.5 Sonnet prompt chains, dynamic image compositing, and rate-limited Instagram Graph publishing.",
      problem: "Manual content creation and publishing is tedious, inconsistent, and error-prone. Social APIs enforce strict rate-limits and token quotas that crash naive cron jobs.",
      solution: "Designed an AWS CDK serverless state machine: EventBridge triggers Step Functions, collecting data across Greenhouse/Lever, filtering with DynamoDB deduplication, querying AWS Bedrock Claude 3.5 for tailored copy, rendering SVG/Canvas creatives, and dispatching via SQS token-bucket rate limiter.",
      keyMetrics: ["100% Serverless (Zero Idle Cost)", "Sub-2s AI Creative Synthesis", "Strict Rate-Limit Compliance"],
      designPatterns: ["Pipes and Filters", "Token Bucket Rate Limiter", "State Machine Orchestration", "Prompt Chaining"],
      nodes: [
        { id: "cron", name: "EventBridge Cron", role: "Timed Trigger", technology: "AWS EventBridge", latency: "Instant", description: "Configurable schedules trigger automated multi-source discovery runs.", status: "active" },
        { id: "stepfunc", name: "Step Functions State Machine", role: "Workflow Orchestrator", technology: "AWS Step Functions", latency: "Stateful", description: "Manages task lifecycle, retries with exponential backoff, and error handling.", status: "active" },
        { id: "collector", name: "Collector & Deduplicator", role: "Ingestion Lambda", technology: "Node.js 20 + DynamoDB", latency: "250ms", description: "Fetches job feeds, normalizes schema, and deduplicates against DynamoDB hash ledger.", status: "synced" },
        { id: "bedrock", name: "AWS Bedrock Claude 3.5", role: "GenAI Synthesis", technology: "Anthropic Claude 3.5", latency: "1.2s", description: "Synthesizes engaging caption hooks, structured bullet points, and optimized hashtags.", status: "active" },
        { id: "canvas", name: "Creative Renderer", role: "Vector Image Engine", technology: "Sharp / S3 / Lambda", latency: "450ms", description: "Generates high-resolution branded promotional carousels saved directly to S3.", status: "synced" },
        { id: "sqs-pub", name: "Publisher with Token SQS", role: "Rate-Limited Delivery", technology: "AWS SQS + Graph API", latency: "Rate-Guarded", description: "Pours posts into an SQS FIFO queue respecting Instagram Graph API rate thresholds.", status: "ready" },
      ],
      connections: [
        { from: "cron", to: "stepfunc", label: "Trigger Execution" },
        { from: "stepfunc", to: "collector", label: "Fetch Feed Items" },
        { from: "collector", to: "bedrock", label: "Prompt Generation" },
        { from: "bedrock", to: "canvas", label: "Render Creative Asset" },
        { from: "canvas", to: "sqs-pub", label: "Enqueue SQS Publisher" },
      ],
    },
    {
      id: "resilient-microservices-saga",
      title: "Enterprise Microservices Saga & Circuit Breaker Workflow",
      badge: "Automobile Dealership Cloud Platform",
      summary: "Distributed event-driven transaction processing for automotive sales, inventory, and financing across multi-region AWS cloud services with SRE observability.",
      problem: "Monolithic dealership systems caused data inconsistency between inventory, banking credit checks, and service dispatch during flash sales or heavy month-end closings.",
      solution: "Architected microservices using the Distributed Saga pattern with AWS SQS/SNS and EventBridge. Integrated Circuit Breakers on external finance APIs and built real-time APM telemetry (New Relic + Splunk + PagerDuty) maintaining 99.9% uptime and <200ms API response time.",
      keyMetrics: ["25% Higher Throughput", "MTTR Reduced by 30%", "<200ms Latency SLA"],
      designPatterns: ["Saga Pattern", "Circuit Breaker", "Event-Driven Pub/Sub", "Outbox Pattern"],
      nodes: [
        { id: "portal", name: "Dealership POS / Web", role: "User Facing Tier", technology: "React + Next.js", latency: "40ms", description: "Dealer advisors submit financing, sales, and inventory allocation contracts.", status: "active" },
        { id: "apigw", name: "API Gateway & Lambda", role: "Edge Ingestion", technology: "AWS API Gateway", latency: "15ms", description: "Handles authentication, rate throttling, and routes commands to microservices.", status: "active" },
        { id: "eventbridge", name: "EventBridge Bus", role: "Distributed Event Router", technology: "AWS EventBridge", latency: "20ms", description: "Decouples services; routes order events to Inventory, Financing, and Servicing.", status: "synced" },
        { id: "saga", name: "Saga Orchestrator", role: "Transaction Coordinator", technology: "Step Functions / SQS", latency: "35ms", description: "Coordinates two-phase commits and compensation rollbacks if credit approval fails.", status: "synced" },
        { id: "circuit", name: "Circuit Breaker Guard", role: "3rd-Party API Protection", technology: "Opossum / Redis", latency: "<2ms", description: "Protects core services by tripping open when external banking credit endpoints degrade.", status: "ready" },
        { id: "observability", name: "SRE Observability Tier", role: "Monitoring & Alerting", technology: "CloudWatch + New Relic", latency: "Real-time", description: "Streams telemetry, logs, and error budgets; triggers PagerDuty on SLA threshold breach.", status: "ready" },
      ],
      connections: [
        { from: "portal", to: "apigw", label: "HTTPS / REST" },
        { from: "apigw", to: "eventbridge", label: "Publish DealEvent" },
        { from: "eventbridge", to: "saga", label: "Start Saga Steps" },
        { from: "saga", to: "circuit", label: "Credit Verification" },
        { from: "eventbridge", to: "observability", label: "Telemetry & APM" },
      ],
    },
    {
      id: "dynamic-forms-schema",
      title: "High-Throughput Dynamic Form Schema & Event-Bus Engine",
      badge: "Lelafe Banking & Education",
      summary: "Runtime-configurable schema generation handling 10,000+ concurrent submissions with Factory Method extensibility and RabbitMQ/Redis event offloading.",
      problem: "Banking and university clients required bespoke, frequently changing forms with conditional logic, validations, and attachments without requiring code recompilation.",
      solution: "Engineered a runtime dynamic form engine using Factory and Observer design patterns. Schema trees are cached in Redis clusters (sub-5ms retrieval) and submitted payloads are decoupled through RabbitMQ queues for asynchronous database ingestion.",
      keyMetrics: ["10K+ Concurrent Submissions", "40% MongoDB Latency Improvement", "Zero-Downtime Schema Updates"],
      designPatterns: ["Factory Method", "Observer Pattern", "Cache-Aside Pattern", "Pub/Sub"],
      nodes: [
        { id: "builder", name: "Form Builder Studio", role: "Configurator UI", technology: "Angular / React", latency: "Instant", description: "Client administrators construct multi-step forms with live validation rules.", status: "active" },
        { id: "schema-cache", name: "Redis Schema Cache", role: "In-Memory Hierarchy", technology: "Redis Cluster", latency: "2ms", description: "Caches compiled JSON schema representations for millisecond runtime lookups.", status: "synced" },
        { id: "factory", name: "Factory Method Engine", role: "Runtime Validator", technology: "Node.js Microservice", latency: "10ms", description: "Dynamically instantiates field validators and calculates conditional business logic.", status: "active" },
        { id: "rabbitmq", name: "RabbitMQ Event Bus", role: "Asynchronous Queue", technology: "RabbitMQ Cluster", latency: "5ms", description: "Buffers high-traffic submission bursts to protect transactional databases.", status: "synced" },
        { id: "storage", name: "Optimized Storage", role: "Persistence Layer", technology: "MongoDB + DocumentDB", latency: "25ms", description: "Indexed schema documents with tuned aggregation pipelines for student & banking records.", status: "ready" },
      ],
      connections: [
        { from: "builder", to: "schema-cache", label: "Publish Form Schema" },
        { from: "schema-cache", to: "factory", label: "Fetch Schema" },
        { from: "factory", to: "rabbitmq", label: "Queue Valid Submission" },
        { from: "rabbitmq", to: "storage", label: "Async Batch Persist" },
      ],
    },
  ],

  projects: [
    {
      id: "job-to-instagram",
      title: "Autonomous Job-to-Instagram Serverless Platform",
      subtitle: "AWS Serverless · Bedrock Claude 3.5 Sonnet · Step Functions · SQS",
      category: "AI & Serverless",
      featured: true,
      summary: "End-to-end automated platform on AWS that discovers tech job opportunities from multiple APIs (Greenhouse, Lever, Adzuna), employs Claude 3.5 Sonnet on AWS Bedrock to craft viral Instagram carousels and captions, and publishes automatically with token-bucket rate limiting.",
      architectureHighlights: [
        "Infrastructure as Code (IaC) via AWS CDK with 3 decoupled stacks (Core, Lambdas, Dashboard)",
        "Stateful workflow orchestration using AWS Step Functions with retry exponential backoff",
        "Token-bucket rate-limiting queue (SQS FIFO) preventing Instagram Graph API throttling",
        "DynamoDB hash ledger guaranteeing zero duplicate posts across ingestion cycles",
      ],
      techStack: ["AWS CDK", "TypeScript", "AWS Bedrock", "Claude 3.5", "Step Functions", "AWS Lambda", "DynamoDB", "SQS", "Instagram Graph API", "React"],
      metrics: [
        { label: "Operating Cost", value: "$0 Idle Cost" },
        { label: "Synthesis Speed", value: "< 2.5s / Post" },
        { label: "Architecture", value: "100% Serverless" },
      ],
    },
    {
      id: "enterprise-erp",
      title: "Enterprise Multi-Tenant School ERP & SIS",
      subtitle: "NestJS Fastify · PostgreSQL 16 2-Tier RLS · BullMQ · DeepSeek-R1 AI",
      category: "Full-Stack Enterprise",
      featured: true,
      summary: "High-density enterprise ERP spanning 15 domains (SuperAdmin, SIS, Attendance, Fees, Exams, LMS, HR, Inventory). Features database-level Row-Level Security (RLS), AsyncLocalStorage tenant context propagation, BullMQ background processing, and self-hosted local AI assistance with Ollama.",
      architectureHighlights: [
        "PostgreSQL 16 2-Tier Row-Level Security (RLS) guaranteeing strict multi-tenant isolation",
        "Fastify + NestJS engine with AsyncLocalStorage for zero-overhead context passing",
        "Self-hosted Ollama AI integration (DeepSeek-R1 / Llama 3) for autonomous report cards & smart query answering",
        "React 19 + TanStack high-density dashboard with barcode/QR scanning and virtualized lists",
      ],
      techStack: ["NestJS 10", "Fastify", "PostgreSQL 16", "TypeORM RLS", "Redis", "BullMQ", "Ollama (DeepSeek-R1)", "React 19", "TanStack Router", "Tailwind CSS 4"],
      metrics: [
        { label: "Tenant Isolation", value: "DB Kernel RLS" },
        { label: "Domain Modules", value: "15 Enterprise" },
        { label: "Concurrency", value: "5,000+ Active" },
      ],
    },
    {
      id: "automobile-dealership",
      title: "Cloud-Native Automobile Dealership Enterprise Platform",
      subtitle: "Nagarro US Client · EventBridge · SQS/SNS · Lambda · New Relic · Splunk",
      category: "Distributed Systems",
      featured: true,
      summary: "Architected and led the cloud-native dealership management platform for a premier US automotive client covering sales, real-time inventory, vehicle servicing, and loan financing with Generative AI copilots and strict SLA observability.",
      architectureHighlights: [
        "Decoupled asynchronous workflows with AWS EventBridge, SQS, and SNS applying Saga & Circuit Breaker patterns",
        "Serverless data processing and reporting pipelines using AWS Lambda and S3",
        "Comprehensive SRE monitoring with CloudWatch dashboards, New Relic APM, and Splunk alerts, slashing MTTR by 30%",
        "Rigorous performance engineering (query tuning, Redis caching, connection pooling) enabling 25% higher system throughput",
      ],
      techStack: ["AWS Lambda", "SQS / SNS", "EventBridge", "Terraform", "Node.js", "React", "MongoDB", "New Relic APM", "Splunk", "PagerDuty"],
      metrics: [
        { label: "Latency SLA", value: "< 200ms" },
        { label: "Throughput Boost", value: "+25%" },
        { label: "MTTR Reduction", value: "30% Lower" },
      ],
    },
    {
      id: "dynamic-forms-sis",
      title: "Dynamic Runtime Forms Engine & Student Information SaaS",
      subtitle: "Lelafe IT Solutions · RabbitMQ · Redis · MongoDB · Playwright",
      category: "Microservices",
      featured: false,
      summary: "Architected a multi-tenant SaaS student lifecycle system (admissions, courses, exams, fees, HR) and a runtime dynamic form builder for major banking and government education clients.",
      architectureHighlights: [
        "Factory and Observer design patterns powering runtime-configurable forms with custom validation trees",
        "Microservices migration leveraging RabbitMQ message queues and Redis cluster caching",
        "Optimized MongoDB indexing and aggregation pipelines, yielding 40% performance improvement under stress tests",
        "Playwright end-to-end test suites catching regressions pre-deployment and sustaining 99.9% uptime SLA",
      ],
      techStack: ["Node.js", "Angular", "React", "RabbitMQ", "Redis", "MongoDB", "AWS Lambda", "Playwright", "Jest"],
      metrics: [
        { label: "Concurrent Load", value: "10K+ Req/sec" },
        { label: "DB Latency Cut", value: "40% Faster" },
        { label: "Uptime SLA", value: "99.9% Uptime" },
      ],
    },
    {
      id: "auto-social-content-engine",
      title: "Auto Social Creative & Scheduled Content Engine",
      subtitle: "Vite · React · Node.js · Programmatic SVG/Canvas · Multi-Platform Distribution",
      category: "AI & Serverless",
      featured: false,
      summary: "Multi-channel content creation and asset synthesis platform automating social post generation, brand layout rendering, and scheduling queues.",
      architectureHighlights: [
        "Real-time canvas and SVG composition engine with typography hierarchy and visual asset generation",
        "Modular distribution pipelines for publishing across social graph interfaces",
        "Automated hashtag clustering and audience engagement optimization algorithms",
      ],
      techStack: ["React", "Vite", "Node.js", "Canvas API", "REST APIs", "TypeScript", "SCSS"],
      metrics: [
        { label: "Generation Time", value: "< 1s" },
        { label: "Format Support", value: "Multi-Platform" },
      ],
    },
  ],

  experiences: [
    {
      company: "Nagarro Pvt. Ltd.",
      role: "Staff Engineer",
      period: "Nov 2023 – Present",
      location: "India / Remote",
      clientType: "US Enterprise Client",
      projectFocus: "Cloud-Native Automobile Dealership Platform (Sales, Inventory, Servicing, Financing)",
      achievements: [
        "Architected and led the cloud-native dealership management platform for a flagship US automotive client.",
        "Designed and shipped agentic AI workflows and LLM-powered automation (OpenAI, Claude, Gemini) for customer service and personalized recommendations.",
        "Engineered event-driven asynchronous microservices using AWS SQS, SNS, and EventBridge, incorporating Saga and Circuit Breaker patterns for zero-downtime resilience.",
        "Provisioned and managed cloud infrastructure using Terraform (IaC), establishing repeatable, version-controlled staging and production environments.",
        "Established enterprise observability with CloudWatch dashboards, New Relic APM, and Splunk alerts with PagerDuty on-call rotations, reducing MTTR by 30%.",
        "Delivered database query optimization, caching strategies, and load-balancing tuning enabling 25% higher system throughput while keeping API latencies <200ms.",
        "Managed a team of 8 engineers, leading sprint delivery, architecture governance, and code reviews.",
      ],
      techStack: ["AWS (Lambda, S3, SQS, SNS, EventBridge)", "Terraform IaC", "Node.js", "React", "TypeScript", "MongoDB", "New Relic", "Splunk", "PagerDuty", "GenAI / LLMs"],
      designPatterns: ["Saga Pattern", "Circuit Breaker", "Event-Driven Pub/Sub", "Outbox Pattern"],
    },
    {
      company: "Lelafe IT Solutions",
      role: "Senior Software Engineer",
      period: "Apr 2016 – Oct 2023",
      location: "India",
      clientType: "Government & Banking / Higher Ed",
      projectFocus: "Student Information System & Dynamic Forms Builder",
      achievements: [
        "Architected a multi-tenant SaaS platform managing the student lifecycle: admissions, courses, exams, payments, HR, and notifications.",
        "Designed scalable, event-driven integrations with SSO, payment gateways, Zoom, and BigBlueButton.",
        "Employed AWS Lambda + SNS/SQS to decouple notification services for high reliability and throughput.",
        "Optimized MongoDB queries and indexes, improving response times by 40% under high-concurrency loads.",
        "Automated monitoring with CloudWatch metrics and Splunk alerts, sustaining an uptime SLA of 99.9%.",
        "Built a dynamic runtime form builder using Factory and Observer patterns for banking and education clients handling 10,000+ concurrent requests.",
        "Migrated legacy monolith to microservices using RabbitMQ and Redis for high throughput and horizontal scalability.",
        "Mentored junior and mid-level developers on performance engineering, clean architecture, and DevOps practices.",
      ],
      techStack: ["Node.js", "Angular", "React", "PHP (Laravel)", "MongoDB", "MySQL", "Redis", "RabbitMQ", "AWS Lambda", "Playwright", "Docker"],
      designPatterns: ["Factory Method", "Observer", "Repository", "Strategy", "Pub/Sub"],
    },
  ],

  skillCategories: [
    {
      category: "Agentic & Generative AI",
      description: "LLM orchestration, autonomous agent state machines, and RAG pipelines in production.",
      iconName: "Cpu",
      skills: [
        { name: "AWS Bedrock (Claude 3.5)", level: 95, highlight: "Serverless agent pipelines & creative generation" },
        { name: "Local LLM Inference (DeepSeek-R1 / Ollama)", level: 90, highlight: "Self-hosted private enterprise intelligence" },
        { name: "Agentic Workflows & Prompt Chaining", level: 95, highlight: "Stateful agents with Step Functions & tool calling" },
        { name: "RAG & Vector Retrieval", level: 88, highlight: "Contextual semantic search & document augmentation" },
        { name: "AI-Assisted Engineering (Copilot, Claude)", level: 96, highlight: "Accelerated development, testing, and reviews" },
      ],
    },
    {
      category: "Cloud & Serverless",
      description: "Cloud-native architectures across AWS, Azure, and GCP with IaC automation.",
      iconName: "Cloud",
      skills: [
        { name: "AWS Serverless (Lambda, Step Functions)", level: 98, highlight: "Event-driven scale with zero idle cost" },
        { name: "AWS Messaging (SQS, SNS, EventBridge)", level: 96, highlight: "Decoupled async pub/sub & rate limiters" },
        { name: "Infrastructure as Code (Terraform, AWS CDK)", level: 92, highlight: "Version-controlled repeatable cloud stacks" },
        { name: "Storage & APIs (S3, API Gateway, DynamoDB)", level: 94, highlight: "High-throughput secure data pipelines" },
        { name: "Containerization (Docker, Kubernetes)", level: 86, highlight: "Containerized enterprise deployments" },
      ],
    },
    {
      category: "System Design & Architecture",
      description: "Resilient patterns for fault tolerance, security, and high concurrency.",
      iconName: "Layers",
      skills: [
        { name: "Multi-Tenant Row-Level Security (RLS)", level: 98, highlight: "Kernel-level database tenant isolation" },
        { name: "Event-Driven & Microservices", level: 96, highlight: "Decoupled architectures with asynchronous buses" },
        { name: "Saga & Circuit Breaker Patterns", level: 94, highlight: "Fault-tolerant distributed transactions" },
        { name: "Caching Strategy (Redis Clusters)", level: 95, highlight: "Sub-5ms response caching & session stores" },
        { name: "High-Concurrency Performance Tuning", level: 94, highlight: "Query profiling, index optimization, load balancing" },
      ],
    },
    {
      category: "Full-Stack & Backend",
      description: "High-performance services, reactive frontends, and robust schemas.",
      iconName: "Code",
      skills: [
        { name: "Node.js, TypeScript & Fastify", level: 98, highlight: "Low-overhead asynchronous enterprise backends" },
        { name: "Next.js & React (App Router, React 19)", level: 95, highlight: "Modern server/client components with Sass & Framer" },
        { name: "PostgreSQL & TypeORM / Prisma", level: 94, highlight: "Complex schemas, RLS policies, connection pools" },
        { name: "Message Queues (BullMQ, RabbitMQ)", level: 92, highlight: "Offloaded background jobs & batch workers" },
        { name: "Modern CSS / SCSS & UI/UX Standards", level: 95, highlight: "Glassmorphism, animations, responsive design" },
      ],
    },
    {
      category: "Observability & SRE",
      description: "Proactive monitoring, incident response, and SLA enforcement.",
      iconName: "Activity",
      skills: [
        { name: "AWS CloudWatch & Logs Insights", level: 94, highlight: "Latency telemetry & automated alarm triggers" },
        { name: "New Relic APM", level: 92, highlight: "Distributed tracing & transaction profiling" },
        { name: "Splunk & Log Correlation", level: 90, highlight: "Security auditing & anomaly detection" },
        { name: "PagerDuty On-Call Operations", level: 92, highlight: "Incident escalation & rapid MTTR resolution" },
        { name: "Automated QA (Playwright, Jest, Vitest)", level: 95, highlight: "E2E & unit pipelines in CI/CD" },
      ],
    },
  ],

  techStacks: [
    {
      id: "aws-serverless",
      name: "AWS Serverless (Lambda & Step Functions)",
      category: "Cloud & Serverless",
      level: "Staff Level",
      experience: "9+ Years",
      icon: "Cloud",
      description: "Stateful asynchronous orchestration, microservices execution, and zero idle-cost cloud compute.",
      tags: ["AWS Lambda", "Step Functions", "EventBridge", "CloudWatch"],
    },
    {
      id: "bedrock-claude",
      name: "AWS Bedrock (Claude 3.5 Sonnet)",
      category: "Agentic & GenAI",
      level: "Lead / Production",
      experience: "2+ Years",
      icon: "Cpu",
      description: "Agentic workflows, prompt chaining, automated content synthesis, and recommendation engines.",
      tags: ["Anthropic Claude", "AWS Bedrock", "Prompt Engineering", "RAG"],
    },
    {
      id: "local-llms",
      name: "Local LLMs (DeepSeek-R1 & Ollama)",
      category: "Agentic & GenAI",
      level: "Production",
      experience: "1.5+ Years",
      icon: "Cpu",
      description: "Self-hosted private LLM inferencing for enterprise ERP report cards, query answering, and data protection.",
      tags: ["DeepSeek-R1", "Ollama", "Llama 3", "Local AI"],
    },
    {
      id: "nestjs-fastify",
      name: "NestJS 10 & Fastify",
      category: "Backend & APIs",
      level: "Staff Level",
      experience: "5+ Years",
      icon: "Server",
      description: "High-throughput microservices using Fastify adapter and Node.js AsyncLocalStorage execution boundaries.",
      tags: ["Fastify", "NestJS", "AsyncLocalStorage", "REST APIs"],
    },
    {
      id: "postgres-rls",
      name: "PostgreSQL 16 & 2-Tier RLS",
      category: "Databases & Storage",
      level: "Expert",
      experience: "7+ Years",
      icon: "Database",
      description: "Kernel-level multi-tenant database Row-Level Security, session SET LOCAL policies, and query indexing.",
      tags: ["PostgreSQL 16", "RLS", "TypeORM", "Schema Design"],
    },
    {
      id: "redis-bullmq",
      name: "Redis 7 & BullMQ",
      category: "Databases & Storage",
      level: "Expert",
      experience: "6+ Years",
      icon: "Database",
      description: "Sub-5ms cluster caching, session isolation, distributed lock coordination, and background queues.",
      tags: ["Redis Cluster", "BullMQ", "Pub/Sub", "Rate Limiting"],
    },
    {
      id: "aws-messaging",
      name: "AWS Messaging (SQS, SNS, EventBridge)",
      category: "Cloud & Serverless",
      level: "Staff Level",
      experience: "8+ Years",
      icon: "Cloud",
      description: "Decoupled asynchronous event routing, fanout distribution, FIFO order guarantees, and DLQ handling.",
      tags: ["SQS FIFO", "SNS Topics", "EventBridge", "Token Bucket"],
    },
    {
      id: "saga-circuit-breaker",
      name: "Distributed Saga & Circuit Breakers",
      category: "Architecture",
      level: "Staff Architect",
      experience: "8+ Years",
      icon: "Layers",
      description: "Two-phase commit compensations, third-party degradation protection, and resilient distributed workflows.",
      tags: ["Saga Pattern", "Circuit Breaker", "Resilience", "Outbox"],
    },
    {
      id: "mongodb-docdb",
      name: "MongoDB & AWS DocumentDB",
      category: "Databases & Storage",
      level: "Expert",
      experience: "8+ Years",
      icon: "Database",
      description: "Optimized complex aggregation pipelines, compound indexing, yielding 40% performance gains under load.",
      tags: ["MongoDB", "DocumentDB", "Aggregations", "Query Tuning"],
    },
    {
      id: "nextjs-react",
      name: "Next.js 14/15 & React 19",
      category: "Frontend",
      level: "Expert",
      experience: "7+ Years",
      icon: "Code2",
      description: "App Router architecture, TypeScript, modern SCSS design systems, glassmorphism, and micro-interactions.",
      tags: ["Next.js", "React 19", "SCSS Modules", "Framer Motion"],
    },
    {
      id: "terraform-cdk",
      name: "Terraform (IaC) & AWS CDK",
      category: "Cloud & Serverless",
      level: "Expert",
      experience: "4+ Years",
      icon: "Cloud",
      description: "Automated, version-controlled cloud infrastructure across multi-stack production and staging environments.",
      tags: ["Terraform", "AWS CDK", "IaC", "CloudFormation"],
    },
    {
      id: "docker-kubernetes",
      name: "Docker & Kubernetes",
      category: "DevOps & SRE",
      level: "Advanced",
      experience: "6+ Years",
      icon: "Server",
      description: "Multi-container application packaging, optimized Dockerfiles, network orchestration, and CI/CD pipelines.",
      tags: ["Docker", "Kubernetes", "Containerization", "DevOps"],
    },
    {
      id: "newrelic-splunk",
      name: "New Relic APM, Splunk & CloudWatch",
      category: "DevOps & SRE",
      level: "Staff Level",
      experience: "6+ Years",
      icon: "Activity",
      description: "Comprehensive APM tracing, log correlation, anomaly alerting, and SLA dashboards cutting MTTR by 30%.",
      tags: ["New Relic", "Splunk", "CloudWatch", "APM Telemetry"],
    },
    {
      id: "pagerduty-oncall",
      name: "PagerDuty On-Call Incident Response",
      category: "DevOps & SRE",
      level: "Staff Level",
      experience: "5+ Years",
      icon: "Activity",
      description: "On-call rotation leadership, automated severity triage, runbook escalation, and 99.9% uptime governance.",
      tags: ["PagerDuty", "On-Call", "Incident Response", "SRE"],
    },
    {
      id: "playwright-jest",
      name: "Playwright, Vitest & Jest",
      category: "DevOps & SRE",
      level: "Expert",
      experience: "6+ Years",
      icon: "CheckCircle2",
      description: "End-to-end user journey tests, integration suites, and automated regression guards in CI/CD release cycles.",
      tags: ["Playwright", "Vitest", "Jest", "CI/CD Gates"],
    },
  ],

  certifications: [
    { name: "Amazon Bedrock — The Complete Guide to AWS Generative AI", issuer: "Udemy", year: "2024" },
    { name: "Claude Code — Agentic AI Workflows", issuer: "Udemy", year: "2024" },
    { name: "AWS Certified Cloud Practitioner", issuer: "AWS", year: "2024" },
    { name: "MEAN Stack Certification", issuer: "Udemy", year: "2018" },
  ],

  education: {
    degree: "Bachelor of Engineering (B.E.), Computer Science",
    institution: "University of Jammu",
    location: "Jammu & Kashmir, India",
  },
};
