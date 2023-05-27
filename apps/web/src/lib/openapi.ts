import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '@germla/api';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'Germla API',
    description: 'Germla API to access all the data',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api',
    docsUrl: 'https://github.com/jlalmes/trpc-openapi',
    tags: ['auth', 'users', 'posts'],
});