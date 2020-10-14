package controllers

import (
	"context"
	"strconv"

	"github.com/Sujitnapa21/app/ent"
	"github.com/Sujitnapa21/app/ent/bloodtype"
	"github.com/Sujitnapa21/app/ent/employee"
	"github.com/Sujitnapa21/app/ent/gender"
	"github.com/Sujitnapa21/app/ent/nametitle"
	"github.com/Sujitnapa21/app/ent/status"
	"github.com/gin-gonic/gin"
)

// PatientController defines the struct for the patient controller
type PatientController struct {
	client *ent.Client
	router gin.IRouter
}

// Patient  defines the struct for the patient controller
type Patient struct {
	Idcard     string
	Status     int
	Name       string
	NameTitle  int
	Gender     int
	BloodType  int
	Address    string
	Congenital string
	Allergic   string
	Employee   int
}

// CreatePatient handles POST requests for adding patient entities
// @Summary Create patient
// @Description Create patient
// @ID create-patient
// @Accept   json
// @Produce  json
// @Param patient body ent.Patient true "Patient entity"
// @Success 200 {object} ent.Patient
// @Failure 400 {object} gin.H.
// @Failure 500 {object} gin.H
// @Router /patients [post]
func (ctl *PatientController) CreatePatient(c *gin.Context) {
	obj := Patient{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "patient binding failed",
		})
		return
	}

	s, err := ctl.client.Status.
		Query().
		Where(status.IDEQ(int(obj.Status))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Status not found",
		})
		return
	}

	n, err := ctl.client.NameTitle.
		Query().
		Where(nametitle.IDEQ(int(obj.NameTitle))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "nametitle not found",
		})
		return
	}

	g, err := ctl.client.Gender.
		Query().
		Where(gender.IDEQ(int(obj.Gender))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "gender not found",
		})
		return
	}

	b, err := ctl.client.Bloodtype.
		Query().
		Where(bloodtype.IDEQ(int(obj.BloodType))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "bloodtype not found",
		})
		return
	}
	e, err := ctl.client.Employee.
		Query().
		Where(employee.IDEQ(int(obj.Employee))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "employee not found",
		})
		return
	}

	p, err := ctl.client.Patient.
		Create().
		SetIdcard(obj.Idcard).
		SetStatus(s).
		SetNametitle(n).
		SetName(obj.Name).
		SetGender(g).
		SetBloodtype(b).
		SetAddress(obj.Address).
		SetCongenital(obj.Congenital).
		SetAllergic(obj.Allergic).
		SetEmployee(e).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, p)
}

// ListPatient handles request to get a list of patient entities
// @Summary List patient entities
// @Description list patient entities
// @ID list-patient
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Patient
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /patients [get]
func (ctl *PatientController) ListPatient(c *gin.Context) {
	limitQuery := c.Query("limit")
	limit := 10
	if limitQuery != "" {
		limit64, err := strconv.ParseInt(limitQuery, 10, 64)
		if err == nil {
			limit = int(limit64)
		}
	}

	offsetQuery := c.Query("offset")
	offset := 0
	if offsetQuery != "" {
		offset64, err := strconv.ParseInt(offsetQuery, 10, 64)
		if err == nil {
			offset = int(offset64)
		}
	}

	patients, err := ctl.client.Patient.
		Query().
		WithStatus().
		WithNametitle().
		WithGender().
		WithBloodtype().
		WithEmployee().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, patients)
}

// NewPatientController creates and registers handles for the patient controller
func NewPatientController(router gin.IRouter, client *ent.Client) *PatientController {
	pc := &PatientController{
		client: client,
		router: router,
	}
	pc.register()
	return pc
}

func (ctl *PatientController) register() {
	patients := ctl.router.Group("/patients")
	patients.POST("", ctl.CreatePatient)
	patients.GET("", ctl.ListPatient)

}