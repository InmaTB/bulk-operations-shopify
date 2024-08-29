
import { Link } from "@remix-run/react";
import { Box, Button, CalloutCard, Card, Layout, Page, Text } from "@shopify/polaris";
import React from "react";
import { CustomCalledOut } from "~/components/CustomCalledOut";
import { DropZoneExample } from "~/components/CustomDropZone";
import { Placeholder } from "~/components/PlaceHolder";


type Props = {}

const Index = (props: Props) => {
  return (
    <Page>
      <ui-title-bar title='Bulky operations'></ui-title-bar>
      <Layout>
        <Layout.Section >
          <Card >
            <Text as='h4' variant='headingMd'>
              Export
            </Text>
            <br />
            <Text as='h6'>
              You will be able to select the particular data
            </Text>
            <br />
            <Link to="exportform">
              <Button variant='primary'>New Export</Button>
            </Link>
          </Card>
        </Layout.Section>
        <Layout.Section >
          <Card >
            <Text as="h4" variant="headingMd"> Import</Text>
            <DropZoneExample />
            <br />
            {/* <Link to="app/importform">
              <Button variant='primary'>New Import</Button>
            </Link> */}
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card >
            <Box background="bg-fill-info" borderRadius="100">
              <Placeholder label="You have 0 scheduled jobs" />
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Text as="h4" variant="headingMd"> Help</Text>
          <br />

          <CustomCalledOut 
          title={"Support"} 
          illustration={""} 
          primaryActionContent={"Contact Support"} 
          primaryActionUrl={""} 
          children={undefined} />


        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Index;