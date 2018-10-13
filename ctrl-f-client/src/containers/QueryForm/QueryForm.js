import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import request from 'superagent';

class QueryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('A query was submitted: ' + this.state.value);

        // call API deployed at http://54.255.249.117:3000/query
        const url = 'http://localhost:3001/query';

        const responseParsed = {
            audioSeekTimes: [100, 30, 40, 200, 50],
            videoSeekTimes: []
        };

        request.get(url)
            .set('API_KEY', 'sampleKey1')
            .set('queryString', this.state.value)
            .then((res) => {
                responseParsed.audioSeekTimes = res.body.audioSeekTimes.sort();
                responseParsed.videoSeekTimes = res.body.videoSeekTimes.sort();
            });

        this.props.dataFromQuery(responseParsed);
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Container>
                    <Row>
                        <Col md="11">
                            <FormGroup>
                                <Input type="text" name="query" id="query"
                                       placeholder="Enter some text to find and seek!"
                                       value={this.state.value}
                                       onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="1">
                            <Button color="primary" type="submit">Find!</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        );
    }
}

export default QueryForm;