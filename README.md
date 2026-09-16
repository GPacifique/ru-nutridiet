# RU-NUTRIDIET Website

![RU-NUTRIDIET](https://runutridiet.com/)

Official website for **RU-NUTRIDIET**, a nutrition and dietetics practice based in Kigali, Rwanda.

## About

RU-NUTRIDIET provides personalized nutrition and dietetic services focused on prevention, treatment, healthy weight management, and performance nutrition.

The website provides visitors with information about the practice, its services, nutrition experts, educational resources, and appointment options.

## Features

* 🥗 Personalized nutrition services
* ⚖️ Weight management information
* 🩺 Medical nutrition therapy
* 🏃 Sports nutrition
* 👩‍⚕️ Nutrition expert profiles
* 📅 Appointment requests
* 📝 Nutrition and health articles
* 💬 Client testimonials
* 📞 Contact and callback functionality
* 📍 Practice location information
* 🔐 Privacy and legal information
* 📱 Responsive design for mobile, tablet, and desktop

## Website

🌐 **Production:** https://runutridiet.com

## Project Structure

```text
.
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons and other assets
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Shared page layouts
│   ├── pages/              # Website pages
│   └── styles/             # Global and component styles
├── tests/                  # Automated tests
├── .env.example            # Environment variable template
├── .gitignore
├── package.json
└── README.md
```

> Adjust the structure above to match the actual implementation if the repository uses a different framework or architecture.

## Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm, pnpm, or yarn
* Git

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd runutridiet
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a local environment file:

```bash
cp .env.example .env
```

Configure the required variables in `.env`.

Example:

```env
SITE_URL=
API_URL=
CONTACT_EMAIL=
```

Never commit `.env` files containing credentials or private keys.

### Development

Start the development server:

```bash
npm run dev
```

Open the local development URL shown in your terminal.

### Production Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Development Guidelines

When contributing to the project:

1. Create a feature branch.
2. Keep components reusable and maintainable.
3. Follow the existing project coding conventions.
4. Optimize images and other media assets.
5. Ensure pages remain responsive.
6. Test forms and interactive functionality.
7. Check accessibility before submitting changes.
8. Do not commit secrets or sensitive client information.

## Content Guidelines

Because this is a nutrition and healthcare-related website:

* Health claims should be reviewed before publication.
* Avoid presenting general information as individualized medical advice.
* Use accurate and professionally reviewed nutrition information.
* Protect confidential client information.
* Do not add patient information, medical records, or personally identifiable information to the repository.

## SEO & Performance

The project should maintain:

* Semantic HTML
* Descriptive page titles and metadata
* Open Graph metadata
* Proper heading hierarchy
* Accessible images and forms
* Responsive layouts
* Optimized images
* Fast page loading
* Sitemap and robots configuration
* Appropriate structured data for the practice

## Deployment

The production website is:

**https://runutridiet.com**

Deployment configuration depends on the hosting provider and the framework used by the project.

Before deploying:

```bash
npm run build
```

Verify:

* Production environment variables
* Contact/appointment forms
* Navigation
* Mobile responsiveness
* SEO metadata
* SSL/HTTPS
* Analytics configuration
* Error handling

## Security

Please report security vulnerabilities privately to the project maintainers rather than opening a public issue.

Do not commit:

* API keys
* Passwords
* Authentication tokens
* Database credentials
* Private client information
* Production environment files

## Contributing

Contributions and improvements are welcome.

```text
Fork → Create branch → Make changes → Test → Commit → Pull Request
```

For significant changes, open an issue first to discuss the proposed implementation.

## License

Copyright © RU-NUTRIDIET.

Unless explicitly stated otherwise, the source code, content, branding, images, and other project assets are proprietary and may not be reproduced or redistributed without permission.

## Contact

**RU-NUTRIDIET**
Kigali, Rwanda

Website: https://runutridiet.com
Email: [runutridiet@gmail.com](mailto:runutridiet@gmail.com)

---

**Eat to Prevent, Eat to Treat.**
