import React from "react";

//Component Contents :

//TODO :

function Rankings() {
  return (
    <div className="Container">
      <h2>The Rankings Table :</h2>
      <div>
        <table>
            <thead>
                <tr>
                    <th>Tank Name</th>
                    <th>Nation</th>
                    <th>Tank Role</th>
                    <th>Era</th>
                    <th>Service Period</th>
                    <th>Service Start Date</th>
                    <th>Service End Date</th>
                    <th>Rank</th>
                    <th>Votes</th>
                </tr>
            </thead>
          <tbody>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
          </tr>
          <tr>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rankings;