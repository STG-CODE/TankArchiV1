import React from "react";
import {Link} from "react-router-dom";
import Card from "../Shared/components/UI-Elements/Card";

function Catalogue() {
  return (
    <Card className="Container">
      <div>
        <h2>4.This Is The Catalogue!</h2>
      </div>
      <div>
        <h3>Lorem Ipsum, Lorem Ipsum Lorem ipsum dolor sit amet.</h3>
      </div>
      <div>
        <button>Refresh</button>
      </div>
      <Card>
        <table>
          <tbody>
          <tr>
            <th>
              <Link to="/MainPage/TankPage">1</Link>
            </th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
          <tr>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
          </tr>
          <tr>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
          </tr>
          <tr>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
          </tr>
          </tbody>
        </table>
      </Card>
    </Card>
  );
}

export default Catalogue;