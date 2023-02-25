import { useEffect, useState } from 'react'
import useHttp from '../../hooks/use-http'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
	const [mealsList, setMealsList] = useState([])
	const { isLoading, error, sendRequest: fetchMeals } = useHttp()

	useEffect(() => {
		let loadedMeals = []

		const transformMeals = (meals) => {
			for (const key in meals) {
				loadedMeals.push({
					id: key,
					name: meals[key].name,
					description: meals[key].description,
					price: meals[key].price,
				})
			}

			setMealsList(loadedMeals)
		}

		fetchMeals(
			{
				url: 'https://food-order-18997-default-rtdb.firebaseio.com/meals.json',
			},
			transformMeals
		)
	}, [fetchMeals])

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		)
	}

	if (error) {
		return (
			<section className={classes.mealsError}>
				<p>{error}</p>
			</section>
		)
	}

	const mealsDataList = mealsList.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		></MealItem>
	))

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsDataList}</ul>
			</Card>
		</section>
	)
}

export default AvailableMeals
