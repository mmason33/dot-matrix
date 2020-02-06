/**
 * @class CoordinateTranslator - Translate rise/run (Cartesian Coordinates) to another format
 * Coordinate conversion explained https://www.mathsisfun.com/polar-cartesian-coordinates.html
 */
class CoordinateTranslator {
    constructor() {
        // Default
        this.center_coordinate  =   {
            x: 0,
            y: 0,
            z: 0,
        };
    }

    /**
    * @param    {Object}    center_coordinate
    * @param    {Int}       center_coordinate.x
    * @param    {Int}       center_coordinate.y
    * @param    {Int}       center_coordinate.z
    * @return   {Object}    this
    */
    setCenterCoordinate(coordinate) {
        if (coordinate.x)  this.center_coordinate.x = coordinate.x;
        if (coordinate.y)  this.center_coordinate.y = coordinate.y;
        if (coordinate.z)  this.center_coordinate.z = coordinate.z;
        return this;
    }

    /**
    * @param    {Int}       radius
    * @param    {Int}       angle_in_degrees
    * @return   {Object}    {x:?,y:?,z:?}           A 2D Cartesian Coordinate
    */
    fromPolar(radius, angle_in_degrees) {
        const angle_in_radians = angle_in_degrees * Math.PI / 180.0;
        return {
            x   :   +this.center_coordinate.x + +radius * Math.cos(angle_in_radians)
            ,y  :   +this.center_coordinate.y + +radius * Math.sin(angle_in_radians)
        };
    }

    /**
    * @param    {Int}       radius
    * @param    {Int}       angle_in_degrees
    * @param    {Int}       azimuth_in_degrees
    * @return    {Object}    {x:?,y:?,z:?}           A 3D Cartesian Coordinate
    */
    fromSpherical(radius, angle_in_degrees, azimuth_in_degrees) {
        var angle_in_radians    =   angle_in_degrees    * Math.PI / 180.0;
        var azimuth_in_radians  =   azimuth_in_degrees  * Math.PI / 180.0;
        return  {
            x   :   +this.center_coordinate.x + +radius * Math.sin(azimuth_in_radians) * Math.cos(angle_in_radians)
            ,y  :   +this.center_coordinate.y + +radius * Math.sin(azimuth_in_radians) * Math.sin(angle_in_radians)
            ,z  :   +this.center_coordinate.z + +radius * Math.cos(azimuth_in_radians)
        };
    }

    /**
    * @param    {Object}    coordinate
    * @param    {Int}       coordinate.x
    * @param    {Int}       coordinate.y
    * @return   {Object}    coordinate
    * @return   {Float}     coordinate.dx
    * @return   {Float}     coordinate.dy
    * @return   {Float}     coordinate.radius
    * @return   {Float}     coordinate.radians
    * @return   {Float}     coordinate.degrees
    */
    getVectorToPoint(coordinate) {
        const dx            =   coordinate.x - +this.center_coordinate.x;
        const dy            =   coordinate.y - +this.center_coordinate.y;
        const hypotenuse    =   Math.sqrt( Math.pow(dx,2) + Math.pow(dy,2) );
        const radians       =   adjustRadiansForQuadrant(Math.atan(dy/dx));
        const degrees       =   this.radiansToDegrees(radians);
        function adjustRadiansForQuadrant(radians) {
        //  In Quadrant 1
            if(0<=dx&&0<=dy) {
                return radians;
            }
        //  In Quadrant 2
            if(dx<=0&&0<dy) {
                return radians+(6/6)*Math.PI;
            }
        //  In Quadrant 3
            if(dx<0&&dy<=0) {
                return radians+(6/6)*Math.PI;
            }
        //  In Quadrant 4
            if(0<=dx&&dy<0) {
                return (12/6)*Math.PI+radians;
            }
        }
        return {
            dx:dx,
            dy:dy,
            radius:hypotenuse,
            radians:radians,
            degrees:degrees
        };
    }
    radiansToDegrees(radians) {
        return (180/Math.PI)*radians;
    }
}

//  Usage Example(s):
//  console.log(
//      (new CoordinateTranslator).fromSpherical(10,30,45)
//      ,(new CoordinateTranslator).fromPolar(10,30)
//      ,(new CoordinateTranslator).setCenterCoordinate({x:0,y:0,z:0}).fromPolar(10,45)
//      ,(new CoordinateTranslator).setCenterCoordinate({x:100,y:200,z:0}).getVectorToPoint({x:15,y:25});
//  );