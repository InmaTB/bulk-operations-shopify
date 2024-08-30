import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Banner, Card, Layout, Page, ProgressBar } from "@shopify/polaris";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { useEffect, useState } from "react";

type bulkOperation = {
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
    const data = useLoaderData<bulkOperation | null>();

    console.log('Loaded Data:', data);


    const [pollingData, setPollingData] = useState(data);
    const [shouldPoll, setShouldPoll] = useState(true);

    useEffect(() => setPollingData(data), [data])

    const fetcher = useFetcher();

    useEffect(() => {
        const interval = setInterval(() => {

            if (document.visibilityState === 'visible' && shouldPoll) {
                fetcher.load('/app/exportresult');
            }


        }, 10 * 1000)

        return () => clearInterval(interval)
    }, [shouldPoll, fetcher.load]);


    useEffect(() => {
        if (fetcher.data) {
            setPollingData(fetcher.data as bulkOperation)
        }

        const { status } = fetcher.data as bulkOperation;

        if (status === 'COMPLETED') {
            setShouldPoll(false);
            console.log("---------Polling stopped---------- ");

        }


    }, [fetcher.data])




    return (
        <Page>
            <ui-title-bar title="New Export">

                <button variant="breadcrumb">Bulky</button>
                <button onClick={() => { }}>Back</button>
                <button variant="primary">Download Export</button>
            </ui-title-bar>


            {
                pollingData.status === 'RUNNING' && <Layout>
                    <Layout.Section>
                        <Banner title="Export in Progress">
                            <ProgressBar progress={75}></ProgressBar>
                        </Banner>
                        <br/>

                        <Card>
                            <p>in progress</p>
                            <p>ID: {pollingData.id}</p>
                            <p>STATUS: {pollingData.status}</p>
                        </Card>
                    </Layout.Section>
                </Layout>


            }

{
                pollingData.status === 'COMPLETED' && <Layout>
                    <Layout.Section>
                        <Banner title="Export Finished">
                            <ProgressBar progress={100}></ProgressBar>
                        </Banner>
                        <br/>

                        <Card>
                            <p>in progress</p>
                            <p>ID: {pollingData.id}</p>
                            <p>STATUS: {pollingData.status}</p>
                        </Card>
                    </Layout.Section>
                </Layout>


            }



        </Page>
    );
}

export default ExportResult;
