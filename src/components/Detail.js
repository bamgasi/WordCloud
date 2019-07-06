import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export class Detail extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          {this.props.match.params.id}
        </CardContent>
      </Card>
    )
  }
}

export default Detail
