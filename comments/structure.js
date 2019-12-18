<TableGrid>
    <TableGridProvider>
        <Table>
            <TableContextProvider>
                <tableBox>
                    <tableHeaderBodyBox>

                        <tableHeaderBox>
                            <table>
                                <thead>
                                <HeaderRow>
                                    {Array.<HeaderCell/>}
                                    <ScrollCell/>
                                </HeaderRow>
                                </thead>
                            </table>
                        </tableHeaderBox>

                        <tableBodyBox>
                            <table>
                                <thead>
                                <HeaderRow hidden>
                                    {Array.<SimpleHeaderCell/>}
                                </HeaderRow>
                                </thead>
                                <tbody>
                                {Array.<BodyRow>{Array.<BodyCell/>}</BodyRow>}
                                </tbody>
                            </table>
                        </tableBodyBox>

                    </tableHeaderBodyBox>
                </tableBox>
            </TableContextProvider>
        </Table>
    </TableGridProvider>
</TableGrid>