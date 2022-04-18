import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../_metronic/_partials/controls";
import { OtherProvidersFilter } from "./otherProviders/other-providers-filter/OtherProvidersFilter";
import { OtherProvidersTable } from "./otherProviders/other-providers-table/OtherProvidersTable";
import { useOtherProvidersUIContext } from "./OtherProvidersUIContext";

export function OtherProviderCard() {
  const opportunityProvidersUIContext = useOtherProvidersUIContext();
  const opportunityProvidersUIProps = useMemo(() => {
    return {
      ids: opportunityProvidersUIContext.ids,
    };
  }, [opportunityProvidersUIContext]);

  return (
    <Card>
      <CardHeader title="Providers Community"></CardHeader>
      <CardBody>
        <OtherProvidersFilter />
        {opportunityProvidersUIProps.ids.length > 0}
        <OtherProvidersTable />
      </CardBody>
    </Card>
  );
}
