
import './App.css';
import { Component } from 'react';
import Header from "./components/layout/navbar"
import Footer from "./components/layout/footer"

class App extends Component {
  render(){
    return (
      <>
      <Header/>
      <div style={{marginTop:"76px"}}>
      {this.props.children}
      </div>
      <Footer/>
      </>
      );
  }
}
const [text, setText] = useState('');
const [imageUrl, setImageUrl] = useState('');
const [scanResultFile, setScanResultFile] = useState('');
const [scanResultWebCam, setScanResultWebCam] = useState('');
const classes = useStyles();
const qrRef = useRef(null);


const generateQrCode = async () => {
  try {
    const response = await QRCode.toDataURL(text);
    setImageUrl(response);
  } catch (error) {
    console.log(error);
  }
}
const handleErrorFile = (error) => {
  console.log(error);
}
const handleScanFile = (result) => {
  if (result) {
    setScanResultFile(result);
  }
}
const onScanFile = () => {
  qrRef.current.openImageDialog();
}
const handleErrorWebCam = (error) => {
  console.log(error);
}
const handleScanWebCam = (result) => {
  if (result) {
    setScanResultWebCam(result);
  }
}
return (
  <Container className={classes.conatiner}>
    <Card>
      <h2 className={classes.title}>Generate Download & Scan QR Code with React js</h2>
      <CardContent>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Input QR Code</Button>
          <QrReader
            ref={qrRef}
            delay={300}
            style={{ width: '100%' }}
            onError={handleErrorFile}
            onScan={handleScanFile}
            legacyMode
          />
          <h3>Scanned Code: {scanResultFile}</h3>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <h3>Qr Code Scan by Web Cam</h3>
            <QrReader
              delay={300}
              style={{ width: '100%' }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
            <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Container>
);
const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));

export default App;
