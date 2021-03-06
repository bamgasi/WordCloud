import React from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typegraphy from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
})

const databaseURL = "https://word-cloud-517dc.firebaseio.com";

class Words extends React.Component {
  state = {
    words: null,
    dialog: false,
    word: '',
    weight: '',
  }

  _get() {
    fetch(`${databaseURL}/words.json`).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText)
      }
      return res.json();
    }).then(words => this.setState({words: words}));
  }

  _post(word) {
    return fetch(`${databaseURL}/words.json`, {
      method: 'POST',
      body: JSON.stringify(word)
    }).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText)
      }
      return res.json();
    }).then(data => {
      let nextState = this.state.words;
      nextState[data.name] = word;
      this.setState({words: nextState});
    })
  }

  _delete(id) {
    return fetch(`${databaseURL}/words/${id}.json`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText)
      }
      return res.json();
    }).then(data => {
      let nextState = this.state.words;
      delete nextState[id]
      this.setState({words: nextState});
    })
  }

  handleDialogToggle = () => this.setState({
    dialog: !this.state.dialog
  })

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit = () => {
    const word = {
      word: this.state.word,
      weight: this.state.weight
    }
    this.handleDialogToggle();
    if (!word.word && !word.weight) return;
    this._post(word);
    this.setState({
      word: '',
      weight: ''
    })
  }

  handleDelete = (id) => {
    this._delete(id);
  }

  componentDidMount() {
    this._get();
  }

  render() {
    const { words } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {
          words && Object.keys(words).map(id => {
            const word = words[id];
            return (
              <Card key={id} style={{marginBottom:'5px'}}>
                <CardContent>
                  <Typegraphy color="textSecondary" gutterBottom>
                    가중치: {word.weight}
                  </Typegraphy>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typegraphy variant="h5" component="h2">
                        {word.word}
                      </Typegraphy>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>삭제</Button>
                    </Grid>
                  </Grid>
                  
                </CardContent>
              </Card>
            )
          })
        }
        <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle} >
          <AddIcon />
        </Fab>
        <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
          <DialogTitle>단어추가</DialogTitle>
          <DialogContent>
            <TextField label="단어" type="text" name="word" value={this.state.word} onChange={this.handleValueChange} /><br />
            <TextField label="가중치" type="text" name="weight" value={this.state.weight} onChange={this.handleValueChange} /><br />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Words);