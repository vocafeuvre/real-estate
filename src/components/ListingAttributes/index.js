/* eslint-disable camelcase */
import React from 'react'
import {Header, Divider, Table} from 'semantic-ui-react'

export default ({description, location, price}) => (
  <div>
    <Header as="h3">About this listing</Header>
    <p>{description}</p>

    <Divider />

    <Table celled>
      <Table.Header style={{background: '#f9fafb'}}>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Attributes</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Location</Table.Cell>
          <Table.Cell>{location}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Price</Table.Cell>
          <Table.Cell>{price}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)
