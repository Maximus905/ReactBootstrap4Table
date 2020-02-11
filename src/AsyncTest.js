import React from 'react'
import {Button, Container, Row, Col} from "reactstrap";
import {API} from "./async";
import {GET_DATA} from "./constants";

const getData = async () => {
    console.log('test get data')
    const promise = API.get(GET_DATA, {
        params: {
            filters: {
                f1: 'fv1'
            },
            sorting: {
                s1: 'sv1'
            }
        }
    })
    const res = await promise
    console.log('test get data res', res.data.result.length)
    console.log('reduce', res.data.result.reduce((acc, item) => {
        return item.status === 'Registered' ? acc + 1 : acc
        // return acc
    }, 0))
}

const AsyncTest = () => (
    <Container>
        <Row>
            <Col>
                <Button onClick={getData}>Button</Button>
            </Col>
        </Row>
    </Container>
)
export default AsyncTest