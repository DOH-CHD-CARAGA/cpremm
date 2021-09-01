import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import {
	GetList,
} from '../../../actions/helpers/displayAction';
import InfoGraph from './../../helpers/InfoGraph';

import {
	GetCEIRDashboardNumbers,
	GetCEIRDashboardClassificationNumbers,
	GetCEIRDashboardProfession,
	GetCEIRDashboardCategories,
} from '../../../actions/hfPersonnelAction';

import {
	SET_HF_PERSONNEL_HEALTH_FACILITIES,
} from './../../../actions/types';

const CardCountContainer = (props) => {
	return (
		<div className="cc-container col-md-2">
			<div className="cc-title col-md-12" style={{ backgroundColor: props.titleDivColor }}>
				{props.name}
			</div>
			<div className="col-md-12 cc-body">

				<div className="cc-first-in">
					<div className="cc-title-in">
						HF
               </div>
					<div className="cc-count">
						<h1 className="report-number">{props.hf}</h1>
					</div>
				</div>

				<div className="">
					<div className="cc-title-in">
						HW
               </div>
					<div className="cc-count">
						<h1 className="report-number">{props.hw}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

const CarouselContainer = (props) => {
	var keys = Object.keys(props.data);
	console.log(":::::::::::::::::::::::::--------");
	console.log(keys);
	keys.shift();
	keys.shift();
	return (
		<div className="car-container col-md-12">
			<div className="car-title" style={{ backgroundColor: props.titleDivColor }}>{ props.title + " ( " + props.data.hf + " )" }</div>
			<AliceCarousel
				autoPlay
				autoPlayStrategy="none"
				autoPlayInterval={15000}
				animationDuration={1000}
				animationType="fadeout"
				infinite
				mouseTracking
				disableButtonsControls
				items={[...
					keys.map((key, i) => {
						return (key != "hw" && key != "hf")?(
							<div className="item" data-value={i+1}>
								<div className="fl-first-col">{key}</div>
								<div className="fl-second-col">{props.data[key]}</div>
							</div>		
						):null
					})
				]}
				responsive={{
					0: { items: 1 },
					256: { items: 2 },
					512: { items: 3 },
					768: { items: 4 },
					1024: { items: 5 },
				}}
			/>					
		</div>
	);
}



const FacilityList = (props) => {
	var keys = Object.keys(props.data);
	var sorted = [];

	console.log("::::::::::::::::::::::::::;!!!!!!");
	console.log(props.facilities);
	console.log(props.data);
	
	props.facilities.map((key, i) => {
		console.log(key);
		sorted.push({
			name: key,
			count: props.data[key] || 0,
		})
	})

	sorted.sort( ( a, b ) => {
		if ( a.count < b.count ){
			return -1;
		}
		if ( a.count > b.count ){
			return 1;
		}
		return 0;
	} );	

	console.log("+++++++++++++++++++++++++++");
	console.log(sorted);

	return (
		<div className="fl-container">
			<div className="fl-header" style={{ backgroundColor: props.titleDivColor }}>{ props.title + " ( " + props.data.hf + " )" }</div>
			<div className="fl-body" style={{ border: "1px solid " + props.titleDivColor }}>
				<table>
					<thead style={{ borderBottom: "1px solid " + props.titleDivColor }}>
						<tr>
							<th className="fl-first-col">Facility</th>
							<th className="fl-second-col">#</th>
						</tr>
					</thead>
					<tbody>
						{
							sorted.map(({name, count}, i) => {
								return (name != "hw" && name != "hf")?(
									<tr>
										<td className="fl-first-col">{i+1 + " " + name}</td>
										<td className="fl-second-col">{count}</td>
									</tr>		
								):""
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}

class HfPersonnel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			graphFilterCProv: "ALL",
			graphFilterCFaci: "",
			graphFilterPProv: "ALL",
			graphFilterPFaci: "",
		}

		this.props.GetCEIRDashboardNumbers();
		this.props.GetCEIRDashboardClassificationNumbers();
		// this.props.GetCEIRDashboardProfession();
		// this.props.GetCEIRDashboardCategories();
		props.GetList('ceir/health-facility/get', SET_HF_PERSONNEL_HEALTH_FACILITIES, 1, 1000, undefined, undefined, {name: 1, province: 1});
	}


	render() {
		const { allCount, professions, categories, facilities } = this.props.hfPersonnel;
		console.log("__________________________________________");
		console.log(allCount);
		console.log(Object.keys(categories));
		console.log(Object.values(categories));
		
		return (

			<div id="ceir-dashboard" className='row justify-content-center'>
				<div className='col-md-12'>
					<div className='custom-cards-container'>
						<div className='custom-cards rounded-container box-shadow-container'>

							<div className="row">
								<div id="count-cards" className="row col-md-12">
									<CardCountContainer name="ADN" hf={allCount.adn.hf} hw={allCount.adn.hw} titleDivColor="#1395ba" />
									<CardCountContainer name="ADS" hf={allCount.ads.hf} hw={allCount.ads.hw} titleDivColor="#0d3c55" />
									<CardCountContainer name="SDN" hf={allCount.sdn.hf} hw={allCount.sdn.hw} titleDivColor="#ebc844" />
									<CardCountContainer name="SDS" hf={allCount.sds.hf} hw={allCount.sds.hw} titleDivColor="#f16c20" />
									<CardCountContainer name="PDI" hf={allCount.pdi.hf} hw={allCount.pdi.hw} titleDivColor="#c01d7b" />
									<CardCountContainer name="TOTAL" hf={allCount.total.hf} hw={allCount.total.hw} titleDivColor="#1a8d5f" />
								</div>

								<div id="doughnut-div" className="row col-md-12">
									<div className="col-md-6">
										<div className="d-title"><span>Health Facilities</span></div>
										<Doughnut data={{
											datasets: [{
												data: [allCount.adn.hf, allCount.ads.hf, allCount.sdn.hf, allCount.sds.hf, allCount.pdi.hf],
												backgroundColor: [
													'#1395ba',
													'#0d3c55',
													'#ebc844',
													'#f16c20',
													'#c01d7b',
													'#a2b86c',
												],
											}],
											labels: ["ADN", "ADS", "SDN", "SDS", "PDI"],
											text: '23%'
										}} />
									</div>
									<div className="col-md-6">
										<div className="d-title"><span>Health Workers</span></div>
										<Doughnut data={{
											datasets: [{
												data: [allCount.adn.hw, allCount.ads.hw, allCount.sdn.hw, allCount.sds.hw, allCount.pdi.hw],
												backgroundColor: [
													'#1395ba',
													'#0d3c55',
													'#ebc844',
													'#f16c20',
													'#c01d7b',
													'#a2b86c',
												],
											}],
											labels: ["ADN", "ADS", "SDN", "SDS", "PDI"],
											text: '23%'
										}} />
									</div>
								</div>
								<hr />

								<div id="categories-graph-div" className="graph-div col-md-12">
									<InfoGraph 
										type="Bar"
										title="Categories" 
										data={
											{
												labels:[...Object.keys(categories)],
												datasets: [
													{
													'label': ["Categories"],
													'data':[...Object.values(categories)],
													'backgroundColor': "#1a8d5f",
													},
												]
											}
										} 
										options={{
											"responsive": true,
											"animation": {
												"duration": 1500
											},
											"hover": {
												"animationDuration": 0
											},
											"responsiveAnimationDuration": 0,
											"scales": {
												"xAxes":[{"ticks":{"autoSkip":false}}]
											}
										}} 
										changeDate={(filter)=>{
											this.props.GetCEIRDashboardCategories({province: this.state.graphFilterCProv, facility: this.state.graphFilterCFaci});
										}}
										graphFilter={
											<Fragment>
												<select className="d-select" id="year" value={this.state.graphFilterCProv} onChange={(e) => {
													this.setState({ graphFilterCProv: e.target.value })
													// // console.log(e.target.value);
													// this.props.GetCEIRDashboardCategories({province: e.target.value});
												}}>
													<option value="ALL">ALL</option>
													<option value="adn">ADN</option>
													<option value="ads">ADS</option>
													<option value="sdn">SDN</option>
													<option value="sds">SDS</option>
													<option value="pdi">PDI</option>
												</select>
												{
													facilities[this.state.graphFilterCProv]
														?<select className="d-select" id="year" value={this.state.graphFilterCFaci} onChange={(e) => {
																this.setState({ graphFilterCFaci: e.target.value })
																// console.log(e.target.value);
																this.props.GetCEIRDashboardCategories({province: this.state.graphFilterCProv, facility: e.target.value});
															}}>
																<option value=""></option>
																{
																	facilities[this.state.graphFilterCProv].map((data, i) => {
																		return (
																			<option value={data}>{data}</option>
																		)
																	})
																}
															</select>
														:""
												}
												
												
											</Fragment>
										}
									/>			
								</div>	
								<br/>
								<div id="profession-graph-div" className="graph-div col-md-12">
									<InfoGraph 
										type="Bar"
										title="Profession" 
										data={
											{
												labels:[...Object.keys(professions)],
												datasets: [
													{
													'label': ["Profession"],
													'data':[...Object.values(professions)],
													'backgroundColor': "#1a8d5f",
													},
												]
											}
										} 
										options={{
											"responsive": true,
											"animation": {
												"duration": 1500
											},
											"hover": {
												"animationDuration": 0
											},
											"responsiveAnimationDuration": 0,
											"scales": {
												"xAxes":[{"ticks":{"autoSkip":false}}]
											}
										}} 
										changeDate={(filter)=>{
											console.log("__________________________________________-");
											this.props.GetCEIRDashboardProfession({province: this.state.graphFilterPProv, facility: this.state.graphFilterPFaci});
										}}
										graphFilter={
											<Fragment>
												<select className="d-select" id="year" value={this.state.graphFilterPProv} onChange={(e) => {
													this.setState({ graphFilterPProv: e.target.value })
													// // console.log(e.target.value);
													// this.props.GetCEIRDashboardCategories({province: e.target.value});
												}}>
													<option value="ALL">ALL</option>
													<option value="adn">ADN</option>
													<option value="ads">ADS</option>
													<option value="sdn">SDN</option>
													<option value="sds">SDS</option>
													<option value="pdi">PDI</option>
												</select>
												{
													facilities[this.state.graphFilterPProv]
														?<select className="d-select" id="year" value={this.state.graphFilterCFaci} onChange={(e) => {
																this.setState({ graphFilterCFaci: e.target.value })
																// console.log(e.target.value);
																this.props.GetCEIRDashboardProfession({province: this.state.graphFilterPProv, facility: e.target.value});
															}}>
																<option value=""></option>
																{
																	facilities[this.state.graphFilterPProv].map((data, i) => {
																		return (
																			<option value={data}>{data}</option>
																		)
																	})
																}
															</select>
														:""
												}
												
												
											</Fragment>
										}
									/>
								</div>


								<div id="car-container-div" className="row col-md-12">
									<CarouselContainer title="ADN" titleDivColor="#1395ba" data={{...allCount.adn}}/>
									<CarouselContainer title="ADS" titleDivColor="#0d3c55" data={{...allCount.ads}}/>
									<CarouselContainer title="SDN" titleDivColor="#ebc844" data={{...allCount.sdn}}/>
									<CarouselContainer title="SDS" titleDivColor="#f16c20" data={{...allCount.sds}}/>
									<CarouselContainer title="PDI" titleDivColor="#c01d7b" data={{...allCount.pdi}}/>
								</div>

								<div className="row col-md-12" id="facility-list-div">
									<FacilityList title="ADN" titleDivColor="#1395ba" data={{...allCount.adn}} facilities={facilities.adn}/>
									<FacilityList title="ADS" titleDivColor="#0d3c55" data={{...allCount.ads}} facilities={facilities.ads}/>
									<FacilityList title="SDN" titleDivColor="#ebc844" data={{...allCount.sdn}} facilities={facilities.sdn}/>
									<FacilityList title="SDS" titleDivColor="#f16c20" data={{...allCount.sds}} facilities={facilities.sds}/>
									<FacilityList title="PDI" titleDivColor="#c01d7b" data={{...allCount.pdi}} facilities={facilities.pdi}/>
								</div>
							</div><hr />

						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	hfPersonnel: state.hfPersonnel,
})

export default connect(mapStateToProps, {
	GetCEIRDashboardNumbers,
	GetCEIRDashboardClassificationNumbers,
	GetCEIRDashboardProfession,
	GetCEIRDashboardCategories,
	GetList,
})(HfPersonnel);

