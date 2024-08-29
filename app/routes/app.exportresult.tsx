import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Page } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";

type BulkOperation = {
    id: string;
    url: string;
    status: string;
    completedAt: string;
    startedAt: string;
    format: string;
};

export const action: ActionFunction = async ({ request }) => {
    return null
}

export const loader: LoaderFunction = async ({ request }) => {
    try {
        const { admin } = await authenticate.admin(request);

        const response = await admin.graphql(
            `#graphql
            query {
                currentBulkOperation (type: QUERY) {
                    id
                    status
                    errorCode
                    createdAt
                    completedAt
                    objectCount
                    fileSize
                    url
                    partialDataUrl
                }
            }
        `);

        if (response.ok) {
            const data = await response.json();

            console.log('GraphQL Response Data:', data.data);

            // Check if currentBulkOperation is null or not
            if (data.data.currentBulkOperation) {
                return json(data.data.currentBulkOperation);
            } else {
                console.log('No current bulk operation found.');
                return json(null);
            }
        } else {
            console.error('GraphQL Response not OK:', response.statusText);
            return json(null);
        }
    } catch (error) {
        console.error('Error in loader function:', error);
        return json(null);
    }
}

const ExportResult = () => {
    const data = useLoaderData<BulkOperation | null>();

    console.log('Loaded Data:', data);

    if (!data) {
        return <Page>No current bulk operation found.</Page>;
    }

    return (
        <Page>
            <h1>Export Result</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Page>
    );
}

export default ExportResult;
