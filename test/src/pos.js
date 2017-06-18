const assert = require('chai').assert;
const Classy = require('oktopost-classy');
const Plankton = require('oktopost-plankton');

const OUI = require('../index');

const Positioner = OUI.core.pos.Positioner;
const Area = OUI.core.pos.Area;
const Box = OUI.core.pos.Box;
const Point = OUI.core.pos.Point;

function getPositioner() 
{
	return new Positioner({
		areas: [new Area(new Box(new Point(1,1), new Point(2,2)), new Point(1,1), '')],
		related: new Box(new Point(1,1), new Point(2,2)),
		target: new Box(new Point(1,1), new Point(2,2)),
		container: new Box(new Point(1,1), new Point(2,2))
	});	
}


suite('Positioner library', () => 
{
	suite('_checkParams', () => 
	{
		test('no areas in data', () => {
			var pos = new Positioner({});
			assert.isFalse(pos._checkParams());
		});
		
		test('no related element', () => {
			var pos = new Positioner({areas: [new Area(new Box(new Point(1,1), new Point(2,2)), new Point(1,1), '')]});
			
			assert.isFalse(pos._checkParams());
		});
		
		test('no target element', () => {
			var pos = new Positioner({
				areas: [new Area(new Box(new Point(1,1), new Point(2,2)), new Point(1,1), '')],
				related: new Box(new Point(1,1), new Point(2,2))
			});
			
			assert.isFalse(pos._checkParams());
		});
		
		test('no container element', () => {
			var pos = new Positioner({
				areas: [new Area(new Box(new Point(1,1), new Point(2,2)), new Point(1,1), '')],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(1,1), new Point(2,2))
			});
			
			assert.isFalse(pos._checkParams());
		});
		
		test('correct settings', () => {
			var pos = new Positioner({
				areas: [new Area(new Box(new Point(1,1), new Point(2,2)), new Point(1,1), '')],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(1,1), new Point(2,2)),
				container: new Box(new Point(1,1), new Point(2,2))
			});
			
			assert.isTrue(pos._checkParams());
		});
	});
	
	suite('_transformTarget', () => 
	{
		test('positive x y', () => 
		{
			var pos = getPositioner();
			var box = new Box(new Point(1,1), new Point(2,2));
			var x = 1;
			var y = 1;
			
			var newBox = pos._transformTarget(box, x, y);
			
			assert.equal(box.x()+x, newBox.x());
			assert.equal(box.y()+y, newBox.y());
		});
		
		test('negative x y', () => 
		{
			var pos = getPositioner();
			var box = new Box(new Point(1,1), new Point(2,2));
			var x = -1;
			var y = -1;
			
			var newBox = pos._transformTarget(box, x, y);
			
			assert.equal(box.x()+x, newBox.x());
			assert.equal(box.y()+y, newBox.y());
		});
	});
	
	suite('_prepareArea', () => 
	{
		test('area not in container', () => {
			
			var area = new Area(new Box(new Point(100,100), new Point(10,10)), new Point(1,1), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(1,1), new Point(2,2)),
				container: new Box(new Point(0,0), new Point(10,10))
			});	
			
			assert.isFalse(pos._prepareArea(area));
		});
		
		test('area in container and not cross its border', () => {
			var area = new Area(new Box(new Point(100,100), new Point(10,10)), new Point(1,1), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(1,1), new Point(2,2)),
				container: new Box(new Point(0,0), new Point(300,300))
			});	
			
			assert.isTrue(pos._prepareArea(area));
		});
		
		test('area in container and cross its border in the bottom', () => {
			var area = new Area(new Box(new Point(100,100), new Point(50,50)), new Point(1,1), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(40,40)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			pos._prepareArea(area);
			
			assert.equal(10, area.box.w());
			assert.equal(10, area.box.h());
			
			assert.equal(1, area.initial.x);
			assert.equal(1, area.initial.y);
			
		});
		
		test('area in container and cross its border in the top', () => {
			var area = new Area(new Box(new Point(50,50), new Point(150,150)), new Point(0,0), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(40,40)),
				container: new Box(new Point(100,100), new Point(110,110))
			});	
			
			pos._prepareArea(area);
			
			assert.equal(100, area.box.w());
			assert.equal(100, area.box.h());
			
			assert.equal(-50, area.initial.x);
			assert.equal(-50, area.initial.y);
			
		});
		
		test('area intersect container, left size too small', () => {
			var area = new Area(new Box(new Point(100,100), new Point(50,50)), new Point(1,1), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(40,40)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isFalse(pos._prepareArea(area));
		});
	});
	
	suite('_moveX', () => 
	{
		test('move x', () => {
			var pos = getPositioner();
		
			var target = new Box(new Point(10, 10), new Point(10, 10));
			var box = new Box(new Point(1,1), new Point(1,1));
			
			assert.equal(-18, pos._moveX(target, box));
		});	
	});
	
	suite('_moveY', () => 
	{
		test('move y', () => {
			var pos = getPositioner();
		
			var target = new Box(new Point(10, 10), new Point(10, 10));
			var box = new Box(new Point(1,1), new Point(1,1));
			
			assert.equal(-18, pos._moveY(target, box));
		});	
	});
	
	suite('_putInArea', () => 
	{
		test('put target in suitable area', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(0,0), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(40,40)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isObject(pos._putInArea(area.box, area.initial.x, area.initial.y, area));
		});
		
		test('put target in too small area', () => {
			var area = new Area(new Box(new Point(0,0), new Point(30,30)), new Point(0,0), '');
			var target = new Box(new Point(0,0), new Point(20,40));
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: target,
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isFalse(pos._putInArea(area.box, area.initial.x, area.initial.y, area));
		});
	});
	
	suite('_putInInitialPoint', () => 
	{
		test('put target in suitable point', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(10,10), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isObject(pos._putInInitialPoint(area));
		});
		
		test('put target in impossible point', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(45,45), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isFalse(pos._putInInitialPoint(area));
		});
	});
	
	suite('_tryPutTargetInArea', () => 
	{
		test('put target in area in suitable initial point', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(10,10), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isTrue(pos._tryPutTargetInArea(area, true));
		});
		
		test('put target in area in impossible initial point', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(45,45), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isFalse(pos._tryPutTargetInArea(area, true));
		});
		
		test('put target in suitable area', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(10,10), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isTrue(pos._tryPutTargetInArea(area, false));
		});
		
		test('put target in too small area ', () => {
			var area = new Area(new Box(new Point(0,0), new Point(20,20)), new Point(10,10), '');
			
			var pos = new Positioner({
				areas: [area],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(30,30)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			assert.isFalse(pos._tryPutTargetInArea(area, false));
		});
	});
	
	suite('_load', () => 
	{
		test('some area fits', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(10,10), '');
			var area2 = new Area(new Box(new Point(20,20), new Point(80,80)), new Point(10,10), '');
			
			var pos = new Positioner({
				areas: [area, area2],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			pos._load(false);
			
			assert.isObject(pos.absolutePosition);
		});
		
		test('no area fits', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(10,10), '');
			var area2 = new Area(new Box(new Point(20,20), new Point(80,80)), new Point(10,10), '');
			
			var pos = new Positioner({
				areas: [area, area2],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(100,100)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			pos._load(false);
			
			assert.isNull(pos.absolutePosition);
		});
	});
	
	suite('getPosition', () => 
	{
		test('some area fits', () => {
			var area = new Area(new Box(new Point(0,0), new Point(50,50)), new Point(10,10), 'right', 'fit');
			var area2 = new Area(new Box(new Point(0,0), new Point(5,5)), new Point(0,0), 'nofit');
			
			var pos = new Positioner({
				areas: [area, area2],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	
			
			pos.getPosition();
			
			assert.equal('right-fit', pos.getPosition().name);
		});
		
		test('no area fits return first', () => {
			var area = new Area(new Box(new Point(0,0), new Point(5,5)), new Point(0,0), 'nofit');
			var area2 = new Area(new Box(new Point(1,1), new Point(5,5)), new Point(0,0), 'nofit2');
			
			var pos = new Positioner({
				areas: [area, area2],
				related: new Box(new Point(1,1), new Point(2,2)),
				target: new Box(new Point(0,0), new Point(10,10)),
				container: new Box(new Point(0,0), new Point(110,110))
			});	

			var position =  pos.getPosition();
			
			assert.isNull(position.name);
			assert.equal(area.box.x(), position.coordinates.x);
			assert.equal(area.box.y(), position.coordinates.y);
		});
	});
});