import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Match = ({id, image, name, date, evtFunction}) => {
    const navigate = useNavigate()

    return<Card className="matchCard dark"
        inverse
        style={{
          width: '18rem'
        }}
      >
        <img
          alt= ""
          src={image}
        />
        <CardBody>
          <CardTitle tag="h5">
            {name}
          </CardTitle>
          <CardSubtitle
            className="mb-2"
            tag="h6"
          >
            {date}
          </CardSubtitle>
            <Button color="light" outline onClick={() => navigate(`/matches/${id}`)}>
                Match Stages
            </Button>
        </CardBody>
      </Card>  
}