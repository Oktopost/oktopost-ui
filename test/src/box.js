const assert = require('chai').assert;
const Classy = require('oktopost-classy');
const Plankton = require('oktopost-plankton');

const OUI = require('../index');

const Positioner = OUI.core.pos.Positioner;
const Area = OUI.core.pos.Area;
const Box = OUI.core.pos.Box;
const Point = OUI.core.pos.Point;


suite('Box model', () => 
{
	suite('_isIntersectHorizontal', () =>
	{
		test('box is not intersect another box horizontal', () => {
			var box1 = new Box(new Point(0,0), new Point(10, 10));
			var box2 = new Box(new Point(11, 11), new Point(10, 10));
			
			assert.isFalse(box1._isIntersectHorizontal(box2.x(), box2.w()));
		});
		
		test('box is intersect another box horizontal', () => {
			var box1 = new Box(new Point(10,10), new Point(30, 30));
			var box2 = new Box(new Point(15, 0), new Point(60, 60));
			
			assert.isTrue(box1._isIntersectHorizontal(box2.x(), box2.w()));
		});
	});
	
	suite('_isIntersectVertical', () =>
	{
		test('box is not intersect another box vertical', () => {
			var box1 = new Box(new Point(0,0), new Point(10, 10));
			var box2 = new Box(new Point(11, 11), new Point(10, 10));
			
			assert.isFalse(box1._isIntersectVertical(box2.y(), box2.h()));
		});
		
		test('box is intersect another box vertical', () => {
			var box1 = new Box(new Point(10,10), new Point(30, 30));
			var box2 = new Box(new Point(0, 15), new Point(60, 30));
			
			assert.isTrue(box1._isIntersectVertical(box2.x(), box2.w()));
		});
	});
	
	suite('isIntersect', () =>
	{
		test('box is not intersect another box', () => {
			var box1 = new Box(new Point(0,0), new Point(10, 10));
			var box2 = new Box(new Point(11, 11), new Point(10, 10));
			
			assert.isFalse(box1.isIntersect(box2));
		});
		
		test('box is intersect another box', () => {
			var box1 = new Box(new Point(0,0), new Point(100, 100));
			var box2 = new Box(new Point(11, 11), new Point(20, 20));
			
			assert.isTrue(box1.isIntersect(box2));
		});
		
		test('box is intersect same box', () => {
			var box1 = new Box(new Point(0,0), new Point(100, 100));
			var box2 = new Box(new Point(0, 0), new Point(100, 100));
			
			assert.isTrue(box1.isIntersect(box2));
		});
	});
	
	suite('_crossHorizontalBorder', () =>
	{
		test('box not cross another box horizontal border', () => {
			var box1 = new Box(new Point(0,0), new Point(10, 10));
			var box2 = new Box(new Point(11, 11), new Point(10, 10));
			
			assert.isFalse(box1._crossHorizontalBorder(box2.x(), box2.w()));
		});
		
		test('box cross another box horizontal border from begin', () => {
			var box1 = new Box(new Point(10, 10), new Point(20, 20));
			var box2 = new Box(new Point(15, 0), new Point(100, 100));
			
			assert.isTrue(box1._crossHorizontalBorder(box2.x(), box2.w()));
		});
		
		test('box cross another box horizontal border from end', () => {
			var box1 = new Box(new Point(100, 10), new Point(20, 20));
			var box2 = new Box(new Point(15, 0), new Point(100, 100));
			
			assert.isTrue(box1._crossHorizontalBorder(box2.x(), box2.w()));
		});
	});
	
	suite('_crossVerticalBorder', () =>
	{
		test('box not cross another box vertical border', () => {
			var box1 = new Box(new Point(0,0), new Point(10, 10));
			var box2 = new Box(new Point(11, 11), new Point(10, 10));
			
			assert.isFalse(box1._crossVerticalBorder(box2.y(), box2.h()));
		});
		
		test('box cross another box vertical border from begin', () => {
			var box1 = new Box(new Point(10, 10), new Point(20, 20));
			var box2 = new Box(new Point(0, 15), new Point(100, 100));
			
			assert.isTrue(box1._crossVerticalBorder(box2.y(), box2.h()));
		});
		
		test('box cross another box vertical border from end', () => {
			var box1 = new Box(new Point(100, 10), new Point(20, 20));
			var box2 = new Box(new Point(0, 15), new Point(100, 100));
			
			assert.isTrue(box1._crossVerticalBorder(box2.y(), box2.h()));
		});
	});
	
	suite('isCrossBorder', () =>
	{
		test('box not cross border of another box', () => {
			var box1 = new Box(new Point(0,0), new Point(10, 10));
			var box2 = new Box(new Point(11, 11), new Point(10, 10));
			
			assert.isFalse(box1.isCrossBorder(box2));
		});
		
		test('box not cross border of another box being inside', () => {
			var box1 = new Box(new Point(10,10), new Point(10, 10));
			var box2 = new Box(new Point(0, 0), new Point(100, 100));
			
			assert.isFalse(box1.isCrossBorder(box2));
		});
		
		test('box not cross border of another box being same', () => {
			var box1 = new Box(new Point(10,10), new Point(10, 10));
			var box2 = new Box(new Point(10, 10), new Point(10, 10));
			
			assert.isFalse(box1.isCrossBorder(box2));
		});
		
		test('box cross border of another box', () => {
			var box1 = new Box(new Point(40,40), new Point(110, 110));
			var box2 = new Box(new Point(0, 0), new Point(100, 100));
			
			assert.isTrue(box1.isCrossBorder(box2));
		});
		
		test('box cross border of another box with same start point', () => {
			var box1 = new Box(new Point(0, 0), new Point(110, 110));
			var box2 = new Box(new Point(0, 0), new Point(100, 100));
			
			assert.isTrue(box1.isCrossBorder(box2));
		});
		
		test('box cross border of another box with same end point', () => {
			var box1 = new Box(new Point(0, 0), new Point(100, 100));
			var box2 = new Box(new Point(10, 10), new Point(90, 90));
			
			assert.isTrue(box1.isCrossBorder(box2));
		});
	});
	
	suite('_intersectHorizontal', () =>
	{
		test('horizontal intersect of boxes', () => {
			var box1 = new Box(new Point(0, 0), new Point(100, 100));
			var box2 = new Box(new Point(50, 50), new Point(150, 150));
			
			box1._intersectHorizontal(box2.x(), box2.w());
			
			assert.equal(50, box1.x());
			assert.equal(50, box1.w());
		});
	});
	
	suite('_intersectVertical', () =>
	{
		test('vertical intersect of boxes', () => {
			var box1 = new Box(new Point(0, 0), new Point(100, 100));
			var box2 = new Box(new Point(50, 50), new Point(150, 150));
			
			box1._intersectVertical(box2.y(), box2.h());
			
			assert.equal(50, box1.y());
			assert.equal(50, box1.h());
		});
	});
	
	suite('intersect', () =>
	{
		test('intersect of boxes', () => {
			var box1 = new Box(new Point(0, 0), new Point(100, 100));
			var box2 = new Box(new Point(50, 50), new Point(150, 150));
			
			box1.intersect(box2);
			
			assert.equal(50, box1.x());
			assert.equal(50, box1.w());
			assert.equal(50, box1.y());
			assert.equal(50, box1.h());
		});
	});
});